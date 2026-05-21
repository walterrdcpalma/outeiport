using MediatR;
using Outeiport.Api.Infrastructure.Email;

namespace Outeiport.Api.Features.Proposal;

public class CreateProposalCommandHandler : IRequestHandler<CreateProposalCommand>
{
    private readonly IEmailService _email;

    public CreateProposalCommandHandler(IEmailService email)
    {
        _email = email;
    }

    public async Task Handle(CreateProposalCommand request, CancellationToken ct)
    {
        await _email.SendQuoteRequestAsync(new QuoteEmailData(
            request.Name,
            request.Email,
            request.Phone,
            request.CarLink,
            request.Message), ct);
    }
}
