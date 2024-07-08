import { apiCaller } from '../../axios/client'
import { ENDPOINTS } from './api-endpoinds.service'

export const getAllComplaintService = () => {
  return apiCaller.get(ENDPOINTS.complaint.base)
}

export const approveComplaintService = ({ id }) => {
  return apiCaller.post(ENDPOINTS.complaint.approve(id))
}

export const rejectComplaintService = ({ id }) => {
  return apiCaller.post(ENDPOINTS.complaint.reject(id))
}
