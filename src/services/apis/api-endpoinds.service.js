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
    user: (id) => `/api/account/${id}`,
    tutorRequest: '/api/pending-accounts',
    approvedUpRole: '/api/approved-up-role',
    rejectedUpRole: '/api/rejected-up-role',
  },
  users: {
    base: '/api/account',
  },
  subject: {
    pendingRegister: '/api/pending-registration',
    approvedRegister: '/api/approved-registration',
    approve: '/api/approved-subject-registration',
    reject: '/api/rejected-subject-registration',
  },
  complaint: {
    base: '/api/complaints',
    approve: (id) => `/api/complaint/approved/${id}`,
    reject: (id) => `/api/complaint/rejected/${id}`,
  },
}
