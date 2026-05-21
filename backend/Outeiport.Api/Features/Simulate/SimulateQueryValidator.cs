using FluentValidation;

namespace Outeiport.Api.Features.Simulate;

public class SimulateQueryValidator : AbstractValidator<SimulateQuery>
{
    public SimulateQueryValidator()
    {
        RuleFor(x => x.Url)
            .NotEmpty().WithMessage("URL is required.")
            .Must(BeAValidMobileDeUrl).WithMessage("URL must be a valid mobile.de listing link.");
    }

    private static bool BeAValidMobileDeUrl(string url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
        (uri.Host.EndsWith("mobile.de", StringComparison.OrdinalIgnoreCase) ||
         uri.Host.EndsWith("suchen.mobile.de", StringComparison.OrdinalIgnoreCase));
}
