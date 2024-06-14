import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices.js/auth.slice'
import modalReducer from './slices.js/modal.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
})

export default rootReducer
