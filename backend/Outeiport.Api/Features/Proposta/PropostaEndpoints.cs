using FluentValidation;
using MediatR;

namespace Outeiport.Api.Features.Proposta;

public static class PropostaEndpoints
{
    public static IEndpointRouteBuilder MapPropostaEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/proposta", async (
            CreatePropostaCommand command,
            IValidator<CreatePropostaCommand> validator,
            IMediator mediator,
            CancellationToken ct) =>
        {
            var validation = await validator.ValidateAsync(command, ct);
            if (!validation.IsValid)
                return Results.ValidationProblem(validation.ToDictionary());

            try
            {
                await mediator.Send(command, ct);
                return Results.Ok(new { message = "Proposta submitted successfully." });
            }
            catch (Exception ex)
            {
                return Results.Problem(
                    title: "Failed to send email",
                    detail: ex.Message,
                    statusCode: 500);
            }
        })
        .WithName("CreateProposta")
        .WithTags("Proposta");

        return app;
    }
}
