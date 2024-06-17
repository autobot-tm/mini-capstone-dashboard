import { apiCaller } from '../../axios/client'
import { ENDPOINTS } from './api-endpoinds.service'

export const updateUserService = async ({ fullname, phone }) => {
  console.log({ fullname, phone })
  return await apiCaller.put(ENDPOINTS.users.base, { fullname, phone })
}
