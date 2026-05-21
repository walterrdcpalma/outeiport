namespace Outeiport.Api.Infrastructure.ISV;

// CISV 2025, Art. 7.º — verify exact values at portaldasfinancas.gov.pt before production
public record TabelaEscalao(int LimiteInferior, int LimiteSuperior, decimal ParcelaFixa, decimal TaxaUnitaria);

public static class ISVTables
{
    // Componente Cilindrada — Gasoline / GPL
    // Escalao I  : 0–1250 cc  → base 0        + 3.06/cc
    // Escalao II : 1250–1750  → base 3825      + 7.26/cc above 1250
    // Escalao III: 1750–2600  → base 7455      + 15.03/cc above 1750
    // Escalao IV : >2600      → base 20230.50  + 48.49/cc above 2600
    public static readonly TabelaEscalao[] CilindradaGasolina =
    [
        new(0,    1250,          0m,         3.06m),
        new(1250, 1750,       3_825m,        7.26m),
        new(1750, 2600,       7_455m,       15.03m),
        new(2600, int.MaxValue, 20_230.50m, 48.49m),
    ];

    // Componente Cilindrada — Diesel
    // Escalao I  : 0–1500 cc  → base 0        + 3.06/cc
    // Escalao II : 1500–2000  → base 4590      + 7.26/cc above 1500
    // Escalao III: 2000–3000  → base 8220      + 15.03/cc above 2000
    // Escalao IV : >3000      → base 23250     + 48.49/cc above 3000
    public static readonly TabelaEscalao[] CilindradaDiesel =
    [
        new(0,    1500,          0m,      3.06m),
        new(1500, 2000,       4_590m,     7.26m),
        new(2000, 3000,       8_220m,    15.03m),
        new(3000, int.MaxValue, 23_250m, 48.49m),
    ];

    // Componente Ambiental (CO2 g/km) — same table for gasoline and diesel
    // Escalao I  : 0–99 g      → 0
    // Escalao II : 99–115      → base 0      + 8.00/g above 99
    // Escalao III: 115–145     → base 128    + 14.00/g above 115
    // Escalao IV : 145–175     → base 548    + 25.00/g above 145
    // Escalao V  : 175–195     → base 1298   + 34.00/g above 175
    // Escalao VI : 195–235     → base 1978   + 55.00/g above 195
    // Escalao VII: >235        → base 4178   + 220.00/g above 235
    public static readonly TabelaEscalao[] Ambiental =
    [
        new(0,   99,              0m,       0m),
        new(99,  115,             0m,       8.00m),
        new(115, 145,           128m,      14.00m),
        new(145, 175,           548m,      25.00m),
        new(175, 195,         1_298m,      34.00m),
        new(195, 235,         1_978m,      55.00m),
        new(235, int.MaxValue, 4_178m,    220.00m),
    ];

    // Depreciation coefficient by vehicle age (years since first registration)
    public static readonly decimal[] DepreciationCoefficients =
    [
        1.00m, // < 1 year
        0.90m, // 1 year
        0.80m, // 2 years
        0.75m, // 3 years
        0.65m, // 4 years
        0.55m, // 5 years
        0.45m, // 6 years
        0.35m, // >= 7 years
    ];
}
