import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './slices/modal.slice'
import { authReducer } from './slices/auth.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
})
