import { useMutation } from '@tanstack/react-query'
import { submitProposta } from '../api/propostaApi'
import type { PropostaRequest } from '../../../types/api'

export function usePropostaSubmit() {
  return useMutation({
    mutationFn: (data: PropostaRequest) => submitProposta(data),
  })
}
