import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  changePasswordService,
  requestResetPasswordService,
  signInService,
  signInWithGoogleService,
  signUpService,
} from '../../services/apis/auth.service'
import { load, remove, save } from '../../utils/local-storage'
import { STORAGE_KEYS } from '../../constants/storage.constant'
import { UserRole } from '../../constants/user.constant'
import { ERROR_TRANS_KEYS } from '../../constants/error.constant'

const createInitialState = () => {
  const initialState = {
    user: '',
    token: '',
    role: '',
    loading: false,
    error: null,
    success: false,
  }
  return initialState
}
export const initialState = createInitialState()

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (input, { rejectWithValue }) => {
    try {
      const response = await signInService(input)
      const role = await response.role
      if (role === UserRole.STUDENT || role === UserRole.TUTOR) {
        throw ERROR_TRANS_KEYS.LIMIT_ROLES
      }
      await save(STORAGE_KEYS.AUTH, response)
      return { ...response }
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice. signIn ~ error:', error)
      return rejectWithValue(error)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (input, { rejectWithValue }) => {
    try {
      const response = await signUpService(input)
      return { ...response }
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice. signUp ~ error:', error)
      return rejectWithValue(error)
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (input, { rejectWithValue }) => {
    try {
      await changePasswordService(input)
    } catch (err) {
      console.warn('🚀 ~ file: auth.slice. changePassword ~ error:', err)
      return rejectWithValue(err.response.data)
    }
  }
)

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async ({ token }, { rejectWithValue }) => {
    try {
      console.log('🚀 ~ idToken:', token)
      const response = await signInWithGoogleService({ token: token ?? '' })
      await save(STORAGE_KEYS.AUTH, response?.token)
      return { ...response }
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice. signInWithGoogle ~ error:', error)
      return rejectWithValue(error)
    }
  }
)

export const requestResetPassword = createAsyncThunk(
  'auth/requestResetPassword',
  async (input, { rejectWithValue }) => {
    try {
      await requestResetPasswordService(input)
    } catch (error) {
      console.warn(
        '🚀 ~ file: auth.slice. requestResetPassword ~ error:',
        error
      )
      return rejectWithValue(error)
    }
  }
)

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      remove(STORAGE_KEYS.AUTH)
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice. signOut ~ error:', error)
      return rejectWithValue(error)
    }
  }
)

export const initState = createAsyncThunk(
  'auth/initState',
  async (_, { rejectWithValue }) => {
    try {
      const localAuth = load(STORAGE_KEYS.AUTH)
      const states = {
        ...initialState,
        ...localAuth,
      }
      return states
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice. initState ~ error:', error)
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
    clearSuccess(state) {
      state.success = false
    },
  },
  extraReducers(builder) {
    builder.addCase(initState.pending, (state) => ({
      ...state,
      success: false,
      loading: true,
    }))
    builder.addCase(initState.fulfilled, (state, { payload }) => ({
      ...state,
      user: payload,
      token: payload.token,
      role: payload.role,
      loading: false,
    }))
    builder.addCase(initState.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      success: false,
      error: payload,
    }))
    builder.addCase(signIn.pending, (state) => ({
      ...state,
      loading: true,
      success: false,
    }))
    builder.addCase(signIn.fulfilled, (state, { payload }) => ({
      ...state,
      user: payload,
      token: payload.token,
      role: payload.role,
      loading: false,
      success: true,
    }))
    builder.addCase(signIn.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      success: false,
      error: payload,
    }))
    builder.addCase(signInWithGoogle.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    builder.addCase(signInWithGoogle.fulfilled, (state, { payload }) => ({
      ...state,
      user: payload,
      token: payload.token,
      role: payload.role,
      loading: false,
      success: true,
    }))
    builder.addCase(signInWithGoogle.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      success: false,
      error: payload,
    }))
    builder.addCase(signUp.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      success: false,
      error: payload,
    }))
    builder.addCase(signUp.pending, (state) => ({
      ...state,
      success: false,
      loading: true,
    }))
    builder.addCase(signUp.fulfilled, (state) => ({
      ...state,
      success: true,
      loading: false,
      error: '',
    }))
    builder.addCase(signOut.pending, (state) => ({
      ...state,
      success: false,
      loading: true,
    }))
    builder.addCase(signOut.fulfilled, (state) => ({
      ...state,
      ...initialState,
      success: true,
      loading: false,
    }))
    builder.addCase(signOut.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      success: false,
      error: payload,
    }))
    builder.addCase(changePassword.pending, (state) => ({
      ...state,
      success: false,
      loading: true,
    }))
    builder.addCase(changePassword.fulfilled, (state) => ({
      ...state,
      success: true,
      loading: false,
    }))
    builder.addCase(changePassword.rejected, (state, { payload }) => ({
      ...state,
      loading: false,
      success: false,
      error: payload,
    }))
  },
})

const { actions, reducer } = authSlice
export const authReducer = reducer
export const authActions = actions

export const useAuthSlice = () => {
  const actions = {
    ...authSlice.actions,
    signIn,
    signInWithGoogle,
    initState,
    signUp,
    changePassword,
    signOut,
  }
  return { actions }
}
