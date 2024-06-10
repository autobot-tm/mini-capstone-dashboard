import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from './slices.js/auth.slice'
const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
