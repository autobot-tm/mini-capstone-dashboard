import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signInService } from '../../services/apis/auth.service'
import { STORAGE_KEYS } from '../../constants/storage.constant'
import { load, save } from '../../utils/local-storage'
import { UserRole } from '../../constants/user.constant'
import { ERROR_TRANS_KEYS } from '../../constants/error.constant'

const DEFAULT_STATES = {
  token: '',
  role: '',
  loading: false,
  error: null,
  success: false,
}
const createInitialState = () => {
  const localAuth = load(STORAGE_KEYS.AUTH) ?? {}
  const initialState = {
    ...DEFAULT_STATES,
    ...localAuth,
  }
  return initialState
}
export const initialState = createInitialState()

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (input, { rejectWithValue }) => {
    try {
      const response = await signInService(input)
      const role = response.data.role
      if (role === UserRole.STUDENT) {
        throw ERROR_TRANS_KEYS.LIMIT_ROLES
      }
      const signInResponse = {
        ...response.data,
        role,
      }
      save(STORAGE_KEYS.AUTH, response.data.token)
      return { ...signInResponse }
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice. signIn ~ error:', error)
      return rejectWithValue(error)
    }
  }
)

export const initState = createAsyncThunk(
  'auth/initState',
  async (_, { rejectWithValue }) => {
    try {
      const localAuth = load(STORAGE_KEYS.AUTH) ?? {}
      let newStates = { ...DEFAULT_STATES, token: localAuth }
      return newStates
    } catch (error) {
      console.warn('🚀 ~ file: auth.slice. initState ~ error:', error)
      return rejectWithValue(error)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
    clearActionSucceeded(state) {
      state.success = false
    },
    // TODO: ...add more sync reducer here
  },
  extraReducers: (builder) => {
    builder
      .addCase(initState.pending, (state) => ({
        ...state,
        success: false,
        loading: true,
      }))
      .addCase(initState.fulfilled, (state, { payload }) => ({
        ...state,
        token: payload.token,
        role: payload.role,
        loading: false,
        success: true,
      }))
      .addCase(initState.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        success: false,
        error: payload,
      }))
      .addCase(signIn.pending, (state) => ({
        ...state,
        loading: true,
        success: false,
      }))
      .addCase(signIn.fulfilled, (state, { payload }) => ({
        ...state,
        token: payload.token,
        role: payload.role,
        loading: false,
        success: true,
      }))
      .addCase(signIn.rejected, (state, { payload }) => ({
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
    initState,
  }
  return { actions }
}
