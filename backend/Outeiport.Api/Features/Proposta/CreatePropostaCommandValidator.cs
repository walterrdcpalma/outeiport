using FluentValidation;

namespace Outeiport.Api.Features.Proposta;

public class CreatePropostaCommandValidator : AbstractValidator<CreatePropostaCommand>
{
    public CreatePropostaCommandValidator()
    {
        RuleFor(x => x.Nome)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(100);

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email address.");

        RuleFor(x => x.Telefone)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^\+?[\d\s\-()]{7,20}$").WithMessage("Invalid phone number.");

        RuleFor(x => x.LinkCarro)
            .Must(url => url is null || Uri.TryCreate(url, UriKind.Absolute, out _))
            .WithMessage("Car link must be a valid URL.");

        RuleFor(x => x.Mensagem)
            .NotEmpty().WithMessage("Message is required.")
            .MaximumLength(2000);
    }
}
