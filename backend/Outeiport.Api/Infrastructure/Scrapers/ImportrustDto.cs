using System.Text.Json.Serialization;

namespace Outeiport.Api.Infrastructure.Scrapers;

public record ImportrustResponse(
    [property: JsonPropertyName("sucesso")] bool Sucesso,
    [property: JsonPropertyName("data")]    ImportrustData? Data);

public record ImportrustData(
    [property: JsonPropertyName("carro")] ImportrustCarro? Carro);

public record ImportrustCarro(
    [property: JsonPropertyName("marca")]                      string?  Marca,
    [property: JsonPropertyName("modelo")]                     string?  Modelo,
    [property: JsonPropertyName("versao")]                     string?  Versao,
    [property: JsonPropertyName("combustivel")]                string?  Combustivel,
    [property: JsonPropertyName("emissoes")]                   string?  Emissoes,
    [property: JsonPropertyName("cilindrada_numerico")]        string?  CilindradaNumerico,
    [property: JsonPropertyName("potencia")]                   string?  Potencia,
    [property: JsonPropertyName("tipo_de_caixa")]              string?  TipoDeCaixa,
    [property: JsonPropertyName("preco_final_carro_sem_iva")]  decimal? PrecoFinalSemIva,
    [property: JsonPropertyName("primeiro_registo")]           string?  PrimeiroRegisto,
    [property: JsonPropertyName("quantidade_de_km_numero")]    int?     QuantidadeDeKmNumero);
