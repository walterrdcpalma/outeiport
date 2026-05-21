using Resend;

namespace Outeiport.Api.Infrastructure.Email;

public class ResendEmailService : IEmailService
{
    private readonly IResend _resend;
    private readonly IConfiguration _config;
    private readonly ILogger<ResendEmailService> _logger;

    public ResendEmailService(IResend resend, IConfiguration config, ILogger<ResendEmailService> logger)
    {
        _resend = resend;
        _config = config;
        _logger = logger;
    }

    public async Task SendQuoteRequestAsync(QuoteEmailData data, CancellationToken ct = default)
    {
        var contactEmail = _config["CONTACT_EMAIL"] ?? "contact@outeiport.com";
        var fromAddress  = _config["FROM_EMAIL"]    ?? "noreply@outeiport.com";

        var message = new EmailMessage
        {
            From     = fromAddress,
            Subject  = $"New Quote Request — {data.Name}",
            HtmlBody = BuildHtml(data),
        };
        message.To.Add(contactEmail);

        try
        {
            await _resend.EmailSendAsync(message, ct);
            _logger.LogInformation("Quote email sent for {Name}", data.Name);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send quote email for {Name}", data.Name);
            throw;
        }
    }

    private static string BuildHtml(QuoteEmailData d)
    {
        var carRow = d.CarLink is not null
            ? $"<tr><td>Car link</td><td><a href=\"{Encode(d.CarLink)}\">{Encode(d.CarLink)}</a></td></tr>"
            : string.Empty;

        return
            "<!DOCTYPE html><html lang=\"pt\"><head><meta charset=\"UTF-8\">" +
            "<style>" +
            "body{font-family:Arial,sans-serif;color:#1e293b;}" +
            "table{border-collapse:collapse;width:100%;max-width:600px;}" +
            "td{padding:8px 12px;border-bottom:1px solid #e2e8f0;}" +
            "td:first-child{font-weight:bold;width:140px;color:#64748b;}" +
            "h2{color:#1d4ed8;}" +
            "</style></head><body>" +
            "<h2>New Import Quote Request</h2>" +
            "<table>" +
            $"<tr><td>Name</td><td>{Encode(d.Name)}</td></tr>" +
            $"<tr><td>Email</td><td><a href=\"mailto:{Encode(d.Email)}\">{Encode(d.Email)}</a></td></tr>" +
            $"<tr><td>Phone</td><td>{Encode(d.Phone)}</td></tr>" +
            carRow +
            $"<tr><td>Message</td><td>{Encode(d.Message)}</td></tr>" +
            "</table></body></html>";
    }

    private static string Encode(string s) => System.Web.HttpUtility.HtmlEncode(s);
}
