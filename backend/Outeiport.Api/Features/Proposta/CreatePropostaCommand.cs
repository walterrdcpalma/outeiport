using MediatR;

namespace Outeiport.Api.Features.Proposta;

public record CreatePropostaCommand(
    string Nome,
    string Email,
    string Telefone,
    string? LinkCarro,
    string Mensagem) : IRequest;
