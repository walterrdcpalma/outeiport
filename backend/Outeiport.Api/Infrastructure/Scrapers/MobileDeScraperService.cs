using System.Text.Json;
using System.Text.RegularExpressions;
using Outeiport.Api.Infrastructure.ISV;
using PuppeteerSharp;

namespace Outeiport.Api.Infrastructure.Scrapers;

public class MobileDeScraperService : IMobileDeScraperService, IAsyncDisposable
{
    private IBrowser? _browser;
    private readonly SemaphoreSlim _lock = new(1, 1);
    private readonly ILogger<MobileDeScraperService> _logger;

    public MobileDeScraperService(ILogger<MobileDeScraperService> logger)
    {
        _logger = logger;
    }

    public async Task<CarData> ScrapeAsync(string url, CancellationToken ct = default)
    {
        var browser = await GetBrowserAsync(ct);
        var page = await browser.NewPageAsync();

        try
        {
            await page.SetUserAgentAsync(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36");

            await page.SetExtraHttpHeadersAsync(new Dictionary<string, string>
            {
                ["Accept-Language"] = "de-DE,de;q=0.9,en;q=0.8",
                ["Accept"] = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            });

            await page.GoToAsync(url, new NavigationOptions
            {
                WaitUntil = [WaitUntilNavigation.DOMContentLoaded],
                Timeout = 30_000,
            });

            await AcceptCookiesAsync(page);

            // Wait for the price element as a signal that the page is loaded
            try
            {
                await page.WaitForSelectorAsync(
                    "[data-testid='price-section'], .price-block, h1",
                    new WaitForSelectorOptions { Timeout = 15_000 });
            }
            catch
            {
                _logger.LogWarning("Price selector not found; proceeding anyway");
            }

            // 1. Try structured JSON-LD first (most reliable)
            var carData = await TryExtractJsonLdAsync(page);

            // 2. Fill any gaps via DOM scraping
            await FillFromDomAsync(page, carData);

            return carData.Build();
        }
        finally
        {
            await page.CloseAsync();
        }
    }

    // ── Cookie consent ────────────────────────────────────────────────────────

    private static async Task AcceptCookiesAsync(IPage page)
    {
        try
        {
            var btn = await page.QuerySelectorAsync(
                "button[id*='accept'], button[class*='accept-all'], " +
                "[data-testid='as-CookieConsent'] button:last-child, " +
                ".mde-consent-accept-btn");

            if (btn is not null)
            {
                await btn.ClickAsync();
                await Task.Delay(800);
            }
        }
        catch { /* non-fatal */ }
    }

    // ── JSON-LD extraction ────────────────────────────────────────────────────

    private async Task<CarDataBuilder> TryExtractJsonLdAsync(IPage page)
    {
        var builder = new CarDataBuilder();

        try
        {
            var jsonLdRaw = await page.EvaluateExpressionAsync<string>(
                "JSON.stringify(Array.from(document.querySelectorAll('script[type=\"application/ld+json\"]')).map(s => s.textContent))");

            if (string.IsNullOrWhiteSpace(jsonLdRaw)) return builder;

            var scripts = JsonSerializer.Deserialize<List<string>>(jsonLdRaw) ?? [];

            foreach (var script in scripts)
            {
                if (string.IsNullOrWhiteSpace(script)) continue;

                using var doc = JsonDocument.Parse(script);
                var root = doc.RootElement;

                var type = root.TryGetProperty("@type", out var t) ? t.GetString() : null;
                if (type is not ("Car" or "Vehicle" or "Product")) continue;

                if (root.TryGetProperty("name", out var name))
                    builder.SetName(name.GetString());

                if (root.TryGetProperty("brand", out var brand) &&
                    brand.TryGetProperty("name", out var brandName))
                    builder.Make = brandName.GetString();

                if (root.TryGetProperty("model", out var model))
                    builder.Model = model.GetString();

                if (root.TryGetProperty("mileageFromOdometer", out var mileage) &&
                    mileage.TryGetProperty("value", out var mileageVal))
                    builder.Mileage = (int)mileageVal.GetDouble();

                if (root.TryGetProperty("offers", out var offers) &&
                    offers.TryGetProperty("price", out var price))
                    builder.PriceEur = price.GetDecimal();

                if (root.TryGetProperty("vehicleModelDate", out var year))
                    builder.SetYearString(year.GetString());

                if (root.TryGetProperty("fuelType", out var fuel))
                    builder.SetFuelType(fuel.GetString());
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "JSON-LD extraction failed");
        }

        return builder;
    }

    // ── DOM fallback ──────────────────────────────────────────────────────────

    private async Task FillFromDomAsync(IPage page, CarDataBuilder builder)
    {
        try
        {
            // One JS call returns all needed values; avoids multiple round-trips
            var raw = await page.EvaluateExpressionAsync<JsonElement>(@"
                (function() {
                    function spec(labels) {
                        var list = Array.isArray(labels) ? labels : [labels];
                        var items = document.querySelectorAll(
                            'dl dt, [class*=""key-specs""] [class*=""label""], ' +
                            '[class*=""tech-specs""] [class*=""label""], ' +
                            '[class*=""csc-t-row""] [class*=""label""]');
                        for (var item of items) {
                            var text = item.textContent.trim();
                            for (var lbl of list) {
                                if (text === lbl || text.startsWith(lbl)) {
                                    var sibling = item.nextElementSibling
                                        || item.closest('[class*=""item""], [class*=""row""]')
                                               ?.querySelector('[class*=""value""], dd');
                                    if (sibling) return sibling.textContent.trim();
                                }
                            }
                        }
                        return null;
                    }
                    var h1 = document.querySelector('h1');
                    var priceEl = document.querySelector(
                        '[data-testid=""price-section""] [class*=""price""], ' +
                        '.price-block__price, [class*=""listing-price""]');
                    return {
                        title:       h1 ? h1.textContent.trim() : null,
                        price:       priceEl ? priceEl.textContent.trim() : null,
                        firstReg:    spec(['Erstzulassung','First registration']),
                        mileage:     spec(['Kilometerstand','Mileage']),
                        displacement:spec(['Hubraum','Displacement','Engine size']),
                        co2:         spec(['CO₂-Emissionen','CO2-Emissionen','CO2 emissions']),
                        fuel:        spec(['Kraftstoffart','Fuel type']),
                        power:       spec(['Leistung','Power']),
                        gearbox:     spec(['Getriebeart','Gearbox','Transmission'])
                    };
                })()");

            if (raw.ValueKind == JsonValueKind.Undefined) return;

            if (builder.Make is null && raw.TryGetProperty("title", out var title))
                builder.SetName(title.GetString());

            if (builder.PriceEur == 0 && raw.TryGetProperty("price", out var price))
                builder.SetPriceString(price.GetString());

            if (builder.Year == 0 && raw.TryGetProperty("firstReg", out var firstReg))
                builder.SetErstzulassung(firstReg.GetString());

            if (builder.Mileage == 0 && raw.TryGetProperty("mileage", out var mileage))
                builder.SetMileageString(mileage.GetString());

            if (builder.Displacement == 0 && raw.TryGetProperty("displacement", out var disp))
                builder.SetDisplacementString(disp.GetString());

            if (builder.Co2 == 0 && raw.TryGetProperty("co2", out var co2))
                builder.SetCo2String(co2.GetString());

            if (builder.FuelType == FuelType.Other && raw.TryGetProperty("fuel", out var fuel))
                builder.SetFuelType(fuel.GetString());

            if (builder.PowerKw == 0 && raw.TryGetProperty("power", out var power))
                builder.SetPowerString(power.GetString());

            if (builder.Transmission is null && raw.TryGetProperty("gearbox", out var gearbox))
                builder.Transmission = gearbox.GetString();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "DOM fallback extraction failed");
        }
    }

    // ── Browser lifecycle ─────────────────────────────────────────────────────

    private async Task<IBrowser> GetBrowserAsync(CancellationToken ct)
    {
        if (_browser is not null && _browser.IsClosed is false)
            return _browser;

        await _lock.WaitAsync(ct);
        try
        {
            if (_browser is not null && _browser.IsClosed is false)
                return _browser;

            _logger.LogInformation("Downloading/launching Chromium...");
            var fetcher = new BrowserFetcher();
            await fetcher.DownloadAsync();

            _browser = await Puppeteer.LaunchAsync(new LaunchOptions
            {
                Headless = true,
                Args = ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu",
                        "--disable-dev-shm-usage", "--disable-extensions"],
            });

            return _browser;
        }
        finally
        {
            _lock.Release();
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_browser is not null)
            await _browser.CloseAsync();
    }
}

// ── Builder helper ────────────────────────────────────────────────────────────

internal sealed class CarDataBuilder
{
    public string? Make;
    public string? Model;
    public int Year;
    public int Month = 1;
    public int Mileage;
    public int Displacement;
    public int Co2;
    public FuelType FuelType = FuelType.Other;
    public int PowerKw;
    public decimal PriceEur;
    public string? Transmission;

    public void SetName(string? name)
    {
        if (string.IsNullOrWhiteSpace(name)) return;
        var parts = name.Trim().Split(' ', 2);
        Make  ??= parts[0];
        Model ??= parts.Length > 1 ? parts[1] : parts[0];
    }

    public void SetYearString(string? s)
    {
        if (int.TryParse(s?.Trim().Split('/')[^1], out var y))
            Year = y;
    }

    // Erstzulassung format: "MM/YYYY" or "YYYY"
    public void SetErstzulassung(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return;
        var parts = s.Trim().Split('/');
        if (parts.Length == 2 &&
            int.TryParse(parts[0], out var m) &&
            int.TryParse(parts[1], out var y))
        {
            Month = m;
            Year  = y;
        }
        else if (int.TryParse(parts[0], out var yearOnly))
        {
            Year = yearOnly;
        }
    }

    public void SetMileageString(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return;
        var digits = Regex.Replace(s, @"[^\d]", "");
        if (int.TryParse(digits, out var v)) Mileage = v;
    }

    // Hubraum format: "1.598 cm³" or "1598 ccm"
    public void SetDisplacementString(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return;
        var digits = Regex.Replace(s, @"[^\d]", "");
        if (int.TryParse(digits, out var v)) Displacement = v;
    }

    // CO2 format: "148 g/km (komb.)" or "148 g/km"
    public void SetCo2String(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return;
        var m = Regex.Match(s, @"(\d+)");
        if (m.Success && int.TryParse(m.Groups[1].Value, out var v)) Co2 = v;
    }

    // Leistung format: "110 kW (150 PS)" or "110 kW"
    public void SetPowerString(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return;
        var m = Regex.Match(s, @"(\d+)\s*kW");
        if (m.Success && int.TryParse(m.Groups[1].Value, out var v)) PowerKw = v;
    }

    public void SetPriceString(string? s)
    {
        if (string.IsNullOrWhiteSpace(s)) return;
        var digits = Regex.Replace(s, @"[^\d]", "");
        if (decimal.TryParse(digits, out var v)) PriceEur = v;
    }

    public void SetFuelType(string? s)
    {
        FuelType = s?.ToLowerInvariant() switch
        {
            string f when f.Contains("elektro") || f.Contains("electric") => FuelType.Electric,
            string f when f.Contains("plug") || f.Contains("phev")        => FuelType.PlugInHybrid,
            string f when f.Contains("hybrid")                            => FuelType.Hybrid,
            string f when f.Contains("diesel")                            => FuelType.Diesel,
            string f when f.Contains("benzin") || f.Contains("petrol") ||
                          f.Contains("gasoline") || f.Contains("gpl") ||
                          f.Contains("lpg")                               => FuelType.Gasoline,
            _ => FuelType.Other,
        };
    }

    public CarData Build() => new(
        Make         ?? "Unknown",
        Model        ?? "Unknown",
        Year > 0     ? Year : DateTime.Today.Year,
        Month,
        Mileage,
        Displacement,
        Co2,
        FuelType,
        PowerKw,
        PriceEur,
        Transmission);
}
