import { apiCaller } from '../../axios/client'
import { ENDPOINTS } from './api-endpoinds.service'

export const getAllRegisterRequest = async () => {
  return await apiCaller.get(ENDPOINTS.subject.pendingRegister)
}

export const getAllApprovedRegister = async () => {
  return await apiCaller.get(ENDPOINTS.subject.approvedRegister)
}

export const approveRegisterRequest = ({ accountId }) => {
  return apiCaller.post(ENDPOINTS.subject.approve, { accountId })
}

export const rejectRegisterRequest = ({ accountId }) => {
  return apiCaller.post(ENDPOINTS.subject.reject, { accountId })
}
