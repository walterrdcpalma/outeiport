export interface SimulateRequest {
  url: string
}

export interface ISVBreakdown {
  componenteCilindrada: number
  componenteAmbiental: number
  coeficienteDesvalorizacao: number
  total: number
}

export interface SimulateResponse {
  make: string
  model: string
  year: number
  month: number
  mileage: number
  displacement: number
  co2: number
  fuelType: string
  powerKw: number
  priceEur: number
  transmission?: string
  isv: ISVBreakdown
}

export interface PropostaRequest {
  nome: string
  email: string
  telefone: string
  linkCarro?: string
  mensagem: string
}

export interface ApiError {
  title: string
  detail?: string
  errors?: Record<string, string[]>
}
