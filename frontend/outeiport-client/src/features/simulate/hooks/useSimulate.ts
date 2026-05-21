import { useMutation } from '@tanstack/react-query'
import { simulate } from '../api/simulateApi'
import type { SimulateRequest } from '../../../types/api'

export function useSimulate() {
  return useMutation({
    mutationFn: (data: SimulateRequest) => simulate(data),
  })
}
