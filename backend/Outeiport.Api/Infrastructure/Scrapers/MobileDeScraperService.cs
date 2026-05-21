using System.Text.RegularExpressions;
using Outeiport.Api.Infrastructure.ISV;

namespace Outeiport.Api.Infrastructure.Scrapers;

public class MobileDeScraperService : IMobileDeScraperService
{
    private readonly HttpClient _http;
    private readonly ILogger<MobileDeScraperService> _logger;

    public MobileDeScraperService(HttpClient http, ILogger<MobileDeScraperService> logger)
    {
        _http   = http;
        _logger = logger;
    }

    public async Task<CarData> ScrapeAsync(string url, CancellationToken ct = default)
    {
        var encoded  = Uri.EscapeDataString(url);
        var response = await _http.GetFromJsonAsync<ImportrustResponse>(
            $"api/propostas/get?request={encoded}", ct)
            ?? throw new InvalidOperationException("Empty response from importrust.");

        if (!response.Sucesso || response.Data?.Carro is null)
            throw new InvalidOperationException("Failed to fetch car data.");

        var c = response.Data.Carro;
        _logger.LogInformation("Fetched {Make} {Model} from importrust", c.Marca, c.Modelo);

        var model = string.IsNullOrWhiteSpace(c.Versao)
            ? c.Modelo ?? "Unknown"
            : $"{c.Modelo} {c.Versao}".Trim();

        var (year, month) = ParseRegistration(c.PrimeiroRegisto);

        return new CarData(
            Make:         Capitalize(c.Marca)     ?? "Unknown",
            Model:        model,
            Year:         year,
            Month:        month,
            Mileage:      c.QuantidadeDeKmNumero  ?? 0,
            Displacement: ParseInt(c.CilindradaNumerico),
            Co2:          ParseCo2(c.Emissoes),
            FuelType:     ParseFuelType(c.Combustivel),
            PowerKw:      ParsePowerKw(c.Potencia),
            PriceEur:     c.PrecoFinalSemIva      ?? 0m,
            Transmission: c.TipoDeCaixa);
    }

    private static (int year, int month) ParseRegistration(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return (DateTime.Today.Year, 1);
        // formats: "MM/YYYY" or "YYYY-MM"
        var parts = value.Contains('/') ? value.Split('/') : value.Split('-');
        if (parts.Length == 2 &&
            int.TryParse(parts[0], out var a) &&
            int.TryParse(parts[1], out var b))
        {
            return a > 12 ? (a, b) : (b, a); // YYYY/MM vs MM/YYYY
        }
        return (DateTime.Today.Year, 1);
    }

    private static int ParseInt(string? value) =>
        int.TryParse(value, out var n) ? n : 0;

    private static int ParseCo2(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        var m = Regex.Match(value, @"(\d+)");
        return m.Success ? int.Parse(m.Groups[1].Value) : 0;
    }

    private static int ParsePowerKw(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return 0;
        // "204 CV (150 kW)" → 150
        var m = Regex.Match(value, @"\((\d+)\s*kW\)", RegexOptions.IgnoreCase);
        if (m.Success) return int.Parse(m.Groups[1].Value);
        // fallback: first number
        m = Regex.Match(value, @"(\d+)");
        return m.Success ? int.Parse(m.Groups[1].Value) : 0;
    }

    private static FuelType ParseFuelType(string? value) =>
        value?.ToLowerInvariant() switch
        {
            "gasoleo" or "diesel"                => FuelType.Diesel,
            "gasolina" or "petrol" or "benzin"   => FuelType.Gasoline,
            "elétrico" or "eletrico" or "electric" => FuelType.Electric,
            "híbrido plug-in" or "plug-in hybrid"  => FuelType.PlugInHybrid,
            "híbrido" or "hibrido" or "hybrid"     => FuelType.Hybrid,
            _                                      => FuelType.Other,
        };

    private static string? Capitalize(string? s) =>
        string.IsNullOrWhiteSpace(s) ? s
        : char.ToUpper(s[0]) + s[1..].ToLower();
}
