namespace Outeiport.Api.Infrastructure.ISV;

public enum FuelType
{
    Gasoline,
    Diesel,
    Electric,
    PlugInHybrid,
    Hybrid,
    Other
}

public record CarData(
    string Make,
    string Model,
    int Year,
    int Month,
    int Mileage,
    int Displacement,
    int Co2,
    FuelType FuelType,
    int PowerKw,
    decimal PriceEur,
    string? Transmission);

public record ISVResult(
    decimal ComponenteCilindrada,
    decimal ComponenteAmbiental,
    decimal CoeficienteDesvalorizacao,
    decimal Total);
