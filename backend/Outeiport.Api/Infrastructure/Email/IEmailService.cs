namespace Outeiport.Api.Infrastructure.Email;

public record QuoteEmailData(
    string Name,
    string Email,
    string Phone,
    string? CarLink,
    string Message);

public interface IEmailService
{
    Task SendQuoteRequestAsync(QuoteEmailData data, CancellationToken ct = default);
}
