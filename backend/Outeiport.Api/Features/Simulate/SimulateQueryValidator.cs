using FluentValidation;
using Microsoft.Extensions.Localization;
using Outeiport.Api.Resources;

namespace Outeiport.Api.Features.Simulate;

public class SimulateQueryValidator : AbstractValidator<SimulateQuery>
{
    public SimulateQueryValidator(IStringLocalizer<SharedResource> loc)
    {
        RuleFor(x => x.Url)
            .NotEmpty().WithMessage(_ => loc["UrlRequired"])
            .Must(BeAValidMobileDeUrl).WithMessage(_ => loc["UrlInvalidMobileDe"]);
    }

    private static bool BeAValidMobileDeUrl(string url) =>
        Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
        uri.Host.EndsWith("mobile.de", StringComparison.OrdinalIgnoreCase);
}
