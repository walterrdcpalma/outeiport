import apiClient from '../../../shared/config/apiClient'
import type { ProposalRequest } from '../../../types/api'

export async function submitProposal(data: ProposalRequest): Promise<void> {
  await apiClient.post('/proposta', data)
}
