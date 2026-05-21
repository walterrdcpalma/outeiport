using MediatR;
using Outeiport.Api.Infrastructure.ISV;
using Outeiport.Api.Infrastructure.Scrapers;

namespace Outeiport.Api.Features.Simulate;

public class SimulateQueryHandler : IRequestHandler<SimulateQuery, SimulateResponse>
{
    private readonly IMobileDeScraperService _scraper;
    private readonly ISVCalculator _calculator;

    public SimulateQueryHandler(IMobileDeScraperService scraper, ISVCalculator calculator)
    {
        _scraper    = scraper;
        _calculator = calculator;
    }

    public async Task<SimulateResponse> Handle(SimulateQuery request, CancellationToken ct)
    {
        var car = await _scraper.ScrapeAsync(request.Url, ct);
        var isv = _calculator.Calculate(car);

        return new SimulateResponse(
            car.Make,
            car.Model,
            car.Year,
            car.Month,
            car.Mileage,
            car.Displacement,
            car.Co2,
            car.FuelType.ToString(),
            car.PowerKw,
            car.PriceEur,
            car.Transmission,
            new ISVResultDto(
                isv.ComponenteCilindrada,
                isv.ComponenteAmbiental,
                isv.CoeficienteDesvalorizacao,
                isv.Total));
    }
}
