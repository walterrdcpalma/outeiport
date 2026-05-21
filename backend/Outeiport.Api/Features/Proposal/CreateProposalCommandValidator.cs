using FluentValidation;

namespace Outeiport.Api.Features.Proposal;

public class CreateProposalCommandValidator : AbstractValidator<CreateProposalCommand>
{
    public CreateProposalCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("O nome é obrigatório.")
            .MaximumLength(100);

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("O email é obrigatório.")
            .EmailAddress().WithMessage("Endereço de email inválido.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("O telefone é obrigatório.")
            .Matches(@"^\+?[\d\s\-()]{7,20}$").WithMessage("Número de telefone inválido.");

        RuleFor(x => x.CarLink)
            .NotEmpty().WithMessage("O link do carro é obrigatório.")
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .WithMessage("O link do carro deve ser um URL válido.");

        RuleFor(x => x.Message)
            .NotEmpty().WithMessage("A mensagem é obrigatória.")
            .MaximumLength(2000);
    }
}
