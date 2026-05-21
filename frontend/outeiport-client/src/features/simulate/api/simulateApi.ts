import apiClient from '../../../shared/config/apiClient'
import type { SimulateRequest, SimulateResponse } from '../../../types/api'

export async function simulate(data: SimulateRequest): Promise<SimulateResponse> {
  const res = await apiClient.post<SimulateResponse>('/simulate', data)
  return res.data
}
