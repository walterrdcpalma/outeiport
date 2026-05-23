import axios from 'axios'
import i18n from '../i18n/i18n'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 60_000,
})

apiClient.interceptors.request.use(config => {
  config.headers['Accept-Language'] = i18n.language ?? 'pt'
  return config
})

export default apiClient
