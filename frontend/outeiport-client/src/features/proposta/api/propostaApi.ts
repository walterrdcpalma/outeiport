import apiClient from '../../../shared/config/apiClient'
import type { PropostaRequest } from '../../../types/api'

export async function submitProposta(data: PropostaRequest): Promise<void> {
  await apiClient.post('/proposta', data)
}
