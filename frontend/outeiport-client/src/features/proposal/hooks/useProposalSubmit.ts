import { useMutation } from '@tanstack/react-query'
import { submitProposal } from '../api/proposalApi'
import type { ProposalRequest } from '../../../types/api'

export function useProposalSubmit() {
  return useMutation({
    mutationFn: (data: ProposalRequest) => submitProposal(data),
  })
}
