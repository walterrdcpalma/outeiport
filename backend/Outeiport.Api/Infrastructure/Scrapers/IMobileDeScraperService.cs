using Outeiport.Api.Infrastructure.ISV;

namespace Outeiport.Api.Infrastructure.Scrapers;

public interface IMobileDeScraperService
{
    Task<CarData> ScrapeAsync(string url, CancellationToken ct = default);
}
