import { apiCaller } from '../../axios/client'
import { ENDPOINTS } from './api-endpoinds.service'

export const getDashboard = async () => {
    return await apiCaller.get(ENDPOINTS.dashboard.base)
}
