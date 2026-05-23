using FluentValidation;
using Microsoft.Extensions.Localization;
using Outeiport.Api.Resources;

namespace Outeiport.Api.Features.Proposal;

public class CreateProposalCommandValidator : AbstractValidator<CreateProposalCommand>
{
    public CreateProposalCommandValidator(IStringLocalizer<SharedResource> loc)
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage(_ => loc["NameRequired"])
            .MaximumLength(100);

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage(_ => loc["EmailRequired"])
            .EmailAddress().WithMessage(_ => loc["EmailInvalid"]);

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage(_ => loc["PhoneRequired"])
            .Matches(@"^\+?[\d\s\-()]{7,20}$").WithMessage(_ => loc["PhoneInvalid"]);

        RuleFor(x => x.CarLink)
            .NotEmpty().WithMessage(_ => loc["CarLinkRequired"])
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _))
            .WithMessage(_ => loc["CarLinkInvalid"]);

        RuleFor(x => x.Message)
            .NotEmpty().WithMessage(_ => loc["MessageRequired"])
            .MaximumLength(2000);
    }
}
