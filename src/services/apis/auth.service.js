import { apiCaller } from '../../axios/client'
import { ENDPOINTS } from './api-endpoinds.service'

/**
 * Sign in service.
 * @param {Object} input - The input object.
 * @param {string} input.email - The email.
 * @param {string} input.password - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const signInService = ({ email, password }) => {
  return apiCaller.post(ENDPOINTS.auth.login, { email, password })
}

/**
 * Sign up service.
 * @param {Object} input - The input object.
 * @param {string} input.email - The email.
 * @param {string} input.password - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const signUpService = ({ phone, fullname, email, password }) => {
  return apiCaller.post(ENDPOINTS.auth.register, {
    phone,
    fullname,
    email,
    password,
  })
}

/**
 * Change Password service.
 * @param {Object} input - The input object.
 * @param {string} input.password - The password.
 * @returns {Promise} - The promise of the API call.
 */
export const changePasswordService = async (input) => {
  return await apiCaller.post(ENDPOINTS.auth.changePassword, input)
}

export const signInWithGoogleService = async ({ token }) => {
  return apiCaller.post(ENDPOINTS.auth.google, { token })
}

export const requestResetPasswordService = ({ email }) => {
  return apiCaller.post(ENDPOINTS.auth.requestResetPassword, { email })
}

export const upRoleTutorService = ({ email }) => {
  return apiCaller.post(ENDPOINTS.auth.upRoleTutor, { email })
}
