import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, SignUpFormData } from '../types'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, action: PayloadAction<{ name: string; username: string; email: string }>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
    },
    loginFailure: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.user = null
    },
    signUpSuccess: (state, action: PayloadAction<Omit<SignUpFormData, 'password' | 'confirmPassword'>>) => {
      state.isLoading = false
      state.user = {
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
      }
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, signUpSuccess, logout } = authSlice.actions
export default authSlice.reducer