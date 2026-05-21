using MediatR;

namespace Outeiport.Api.Features.Simulate;

public record SimulateQuery(string Url) : IRequest<SimulateResponse>;

public record SimulateResponse(
    string Make,
    string Model,
    int Year,
    int Month,
    int Mileage,
    int Displacement,
    int Co2,
    string FuelType,
    int PowerKw,
    decimal PriceEur,
    string? Transmission,
    ISVResultDto Isv);

public record ISVResultDto(
    decimal ComponenteCilindrada,
    decimal ComponenteAmbiental,
    decimal CoeficienteDesvalorizacao,
    decimal Total);
