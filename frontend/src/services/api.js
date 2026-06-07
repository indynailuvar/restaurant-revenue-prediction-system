import axios from 'axios'

const API = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, ''),
})

export const predictRevenue = (data) => API.post('/predict', data)
export const getHealth = () => API.get('/health')
export const getModelInfo = () => API.get('/model-info')
export const getPredictionHistory = (limit = 20) =>
  API.get(`/prediction-history?limit=${limit}`)

export default API
