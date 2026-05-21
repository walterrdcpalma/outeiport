using MediatR;

namespace Outeiport.Api.Features.Proposal;

public record CreateProposalCommand(
    string Name,
    string Email,
    string Phone,
    string? CarLink,
    string Message) : IRequest;
