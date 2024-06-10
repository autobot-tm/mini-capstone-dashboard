import apiCaller from '../../axios/client'
import { ENDPOINTS } from './api-endpoinds.service'

export const getUsers = () => {
  return apiCaller.get(ENDPOINTS.userManagement.base)
}

export const deleteUsers = ({ id }) => {
  return apiCaller.delete(ENDPOINTS.userManagement.delete(id))
}
