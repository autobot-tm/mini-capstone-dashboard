import { apiCaller } from '../../axios/client'
import { ENDPOINTS } from './api-endpoinds.service'

export const getUsers = () => {
  return apiCaller.get(ENDPOINTS.userManagement.base)
}

export const getInfoUser = ({ id }) => {
  return apiCaller.get(ENDPOINTS.userManagement.user(id))
}

export const deleteUsers = ({ id }) => {
  return apiCaller.delete(ENDPOINTS.userManagement.user(id))
}

export const restoreUsers = ({ id }) => {
  return apiCaller.patch(ENDPOINTS.userManagement.user(id))
}

export const getTutorRequest = () => {
  return apiCaller.get(ENDPOINTS.userManagement.tutorRequest)
}

export const approveUpTutorRequest = ({ accountId }) => {
  return apiCaller.post(ENDPOINTS.userManagement.approvedUpRole, { accountId })
}

export const rejectUpTutorRequest = ({ accountId }) => {
  return apiCaller.post(ENDPOINTS.userManagement.rejectedUpRole, { accountId })
}
