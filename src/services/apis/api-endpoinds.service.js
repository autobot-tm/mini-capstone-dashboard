export const ENDPOINTS = {
  auth: {
    base: '/api',
    login: '/api/login',
    register: '/api/register',
    changePassword: '/api/reset-password',
    google: '/api/login-google',
    requestResetPassword: '/api/forget-password',
    upRoleTutor: '/api/up-role',
  },
  userManagement: {
    base: '/api/accounts',
    delete: (id) => `/api/account/${id}`,
  },
}
