using MediatR;
using Outeiport.Api.Infrastructure.Email;

namespace Outeiport.Api.Features.Proposta;

public class CreatePropostaCommandHandler : IRequestHandler<CreatePropostaCommand>
{
    private readonly IEmailService _email;

    public CreatePropostaCommandHandler(IEmailService email)
    {
        _email = email;
    }

    public async Task Handle(CreatePropostaCommand request, CancellationToken ct)
    {
        await _email.SendPropostaAsync(new PropostaEmailData(
            request.Nome,
            request.Email,
            request.Telefone,
            request.LinkCarro,
            request.Mensagem), ct);
    }
}
