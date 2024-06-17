import axios from 'axios'
import { APP_CONFIG } from '../config'
import { REQUEST_TIME_OUT } from '../constants/api.constant'

export const apiCaller = axios.create({
  baseURL: APP_CONFIG.BACKEND_URL,
  timeout: REQUEST_TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
})
export const configureApiCaller = (store) => {
  apiCaller.interceptors.response.use(
    (response) => {
      return response?.data
    },
    async (error) => {
      const statusCode = error?.response?.status
      const message = error?.response?.data
      console.log('error', {
        statusCode,
        message,
      })
      return Promise.reject(message)
    }
  )

  apiCaller.interceptors.request.use(async (config) => {
    const { token } = store.getState().auth
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })
}
