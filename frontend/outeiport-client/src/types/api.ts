export interface SimulateRequest {
  url: string
}

export interface IsvBreakdown {
  displacementComponent: number
  environmentalComponent: number
  depreciationCoefficient: number
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
  isv: IsvBreakdown
}

export interface ProposalRequest {
  name: string
  email: string
  phone: string
  carLink?: string
  message: string
}

export interface ApiError {
  title: string
  detail?: string
  errors?: Record<string, string[]>
}
