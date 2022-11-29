import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios.js'

const initialState = {
  data: null,
  status: 'loading',
  token: window.localStorage.getItem('accessToken'),
}

export const fetchLogin = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('auth/login', params)
  return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('auth/register', params)
  return data
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
      window.localStorage.removeItem('accessToken')
      state.token = null
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = 'loading'
      state.data = null
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
      state.token = action.payload.accessToken
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 'error'
      state.data = null
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded'
      state.data = action.payload
      state.token = action.payload.accessToken
    },
  },
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
