import axios from 'axios'
import { APP_CONFIG } from '../config/app.config'
import { REQUEST_TIME_OUT } from '../constants/api.constant'

const config = {
  baseUrl: APP_CONFIG.BACKEND_URL,
  timeout: REQUEST_TIME_OUT,
}
const apiCaller = axios.create(config)
apiCaller.defaults.baseURL = APP_CONFIG.BACKEND_URL
const handleBefore = (config) => {
  const token = localStorage.getItem('AUTH')?.replaceAll('"', '')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}
const handleError = (error) => {
  console.log(error)
  return
}
apiCaller.interceptors.request.use(handleBefore, handleError)

export default apiCaller
