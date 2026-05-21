using FluentValidation;
using MediatR;

namespace Outeiport.Api.Features.Proposal;

public static class ProposalEndpoints
{
    public static IEndpointRouteBuilder MapProposalEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/proposta", async (
            CreateProposalCommand command,
            IValidator<CreateProposalCommand> validator,
            IMediator mediator,
            CancellationToken ct) =>
        {
            var validation = await validator.ValidateAsync(command, ct);
            if (!validation.IsValid)
                return Results.ValidationProblem(validation.ToDictionary());

            try
            {
                await mediator.Send(command, ct);
                return Results.Ok(new { message = "Proposal submitted successfully." });
            }
            catch (Exception ex)
            {
                return Results.Problem(
                    title: "Failed to send email",
                    detail: ex.Message,
                    statusCode: 500);
            }
        })
        .WithName("CreateProposal")
        .WithTags("Proposal");

        return app;
    }
}
