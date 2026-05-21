namespace Outeiport.Api.Infrastructure.Email;

public record PropostaEmailData(
    string Nome,
    string Email,
    string Telefone,
    string? LinkCarro,
    string Mensagem);

public interface IEmailService
{
    Task SendPropostaAsync(PropostaEmailData data, CancellationToken ct = default);
}
