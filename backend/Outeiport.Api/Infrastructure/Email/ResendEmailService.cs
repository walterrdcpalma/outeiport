using Resend;

namespace Outeiport.Api.Infrastructure.Email;

public class ResendEmailService : IEmailService
{
    private readonly IResend _resend;
    private readonly IConfiguration _config;
    private readonly ILogger<ResendEmailService> _logger;

    public ResendEmailService(IResend resend, IConfiguration config, ILogger<ResendEmailService> logger)
    {
        _resend  = resend;
        _config  = config;
        _logger  = logger;
    }

    public async Task SendPropostaAsync(PropostaEmailData data, CancellationToken ct = default)
    {
        var contactEmail = _config["CONTACT_EMAIL"] ?? "contact@outeiport.com";
        var fromAddress  = _config["FROM_EMAIL"]    ?? "noreply@outeiport.com";

        var message = new EmailMessage
        {
            From    = fromAddress,
            Subject = $"Nova Proposta — {data.Nome}",
            HtmlBody = BuildHtml(data),
        };
        message.To.Add(contactEmail);

        try
        {
            await _resend.EmailSendAsync(message, ct);
            _logger.LogInformation("Proposta email sent for {Nome}", data.Nome);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send proposta email for {Nome}", data.Nome);
            throw;
        }
    }

    private static string BuildHtml(PropostaEmailData d)
    {
        var carRow = d.LinkCarro is not null
            ? $"<tr><td>Car link</td><td><a href=\"{Encode(d.LinkCarro)}\">{Encode(d.LinkCarro)}</a></td></tr>"
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
            $"<tr><td>Name</td><td>{Encode(d.Nome)}</td></tr>" +
            $"<tr><td>Email</td><td><a href=\"mailto:{Encode(d.Email)}\">{Encode(d.Email)}</a></td></tr>" +
            $"<tr><td>Phone</td><td>{Encode(d.Telefone)}</td></tr>" +
            carRow +
            $"<tr><td>Message</td><td>{Encode(d.Mensagem)}</td></tr>" +
            "</table></body></html>";
    }

    private static string Encode(string s) =>
        System.Web.HttpUtility.HtmlEncode(s);
}
