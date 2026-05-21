using FluentValidation;
using MediatR;

namespace Outeiport.Api.Features.Simulate;

public static class SimulateEndpoints
{
    public static IEndpointRouteBuilder MapSimulateEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/simulate", async (
            SimulateQuery query,
            IValidator<SimulateQuery> validator,
            IMediator mediator,
            CancellationToken ct) =>
        {
            var validation = await validator.ValidateAsync(query, ct);
            if (!validation.IsValid)
                return Results.ValidationProblem(validation.ToDictionary());

            try
            {
                var result = await mediator.Send(query, ct);
                return Results.Ok(result);
            }
            catch (Exception ex)
            {
                return Results.Problem(
                    title: "Scraping failed",
                    detail: ex.Message,
                    statusCode: 422);
            }
        })
        .WithName("Simulate")
        .WithTags("Simulate");

        return app;
    }
}
