namespace Outeiport.Api.Infrastructure.ISV;

public class ISVCalculator
{
    public ISVResult Calculate(CarData car)
    {
        if (car.FuelType == FuelType.Electric)
            return new ISVResult(0m, 0m, 1.00m, 0m);

        var cilindradaTable = car.FuelType == FuelType.Diesel
            ? ISVTables.CilindradaDiesel
            : ISVTables.CilindradaGasolina;

        var componenteCilindrada = CalculateComponent(cilindradaTable, car.Displacement);
        var componenteAmbiental  = CalculateComponent(ISVTables.Ambiental, car.Co2);

        // Plug-in hybrids get a 25% reduction on the environmental component
        if (car.FuelType == FuelType.PlugInHybrid)
            componenteAmbiental *= 0.75m;

        var coeficiente = GetDepreciationCoefficient(car.Year, car.Month);
        var total = Math.Round((componenteCilindrada + componenteAmbiental) * coeficiente, 2);

        return new ISVResult(
            Math.Round(componenteCilindrada, 2),
            Math.Round(componenteAmbiental, 2),
            coeficiente,
            total);
    }

    private static decimal CalculateComponent(TabelaEscalao[] table, int value)
    {
        // Find the highest escalao whose LimiteInferior is <= value
        var escalao = table.LastOrDefault(e => e.LimiteInferior <= value) ?? table[0];
        return escalao.ParcelaFixa + (value - escalao.LimiteInferior) * escalao.TaxaUnitaria;
    }

    private static decimal GetDepreciationCoefficient(int year, int month)
    {
        var firstReg = new DateOnly(year, Math.Clamp(month, 1, 12), 1);
        var today    = DateOnly.FromDateTime(DateTime.Today);
        var months   = (today.Year - firstReg.Year) * 12 + (today.Month - firstReg.Month);
        var ageBracket = Math.Max(0, months / 12);

        return ageBracket < ISVTables.DepreciationCoefficients.Length
            ? ISVTables.DepreciationCoefficients[ageBracket]
            : ISVTables.DepreciationCoefficients[^1];
    }
}
