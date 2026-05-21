using Outeiport.Api.Infrastructure.ISV;

namespace Outeiport.Api.Infrastructure.Scrapers;

// Stub — returns hardcoded dummy data for development/demo.
// Replace with real scraper implementation once mobile.de bot-protection is handled.
public class MobileDeScraperService : IMobileDeScraperService
{
    public Task<CarData> ScrapeAsync(string url, CancellationToken ct = default)
    {
        var dummy = new CarData(
            Make:         "Land Rover",
            Model:        "Range Rover Evoque D200 S AWD",
            Year:         2021,
            Month:        6,
            Mileage:      45_000,
            Displacement: 1999,
            Co2:          148,
            FuelType:     FuelType.Diesel,
            PowerKw:      150,
            PriceEur:     38_900m,
            Transmission: "Automatic");

        return Task.FromResult(dummy);
    }
}
