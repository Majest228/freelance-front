import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios.js'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const { data } = await axios.get('user/all')
  return data
})

export const fetchMe = createAsyncThunk('users/fetchMe', async () => {
  const { data } = await axios.get('user/profile')
  return data
})

export const fetchWorkers = createAsyncThunk('users/fetchWorkers', async () => {
  const { data } = await axios.get('user/all-worker')
  return data
})

const initialState = {
  users: [],
  user: {},
  status: null,
  statusGetMe: null,
  workers: [],
  statusWorkers: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload
      state.status = 'loaded'
    },
    [fetchUsers.rejected]: (state) => {
      state.user = []
      state.status = 'error'
    },
    [fetchMe.pending]: (state) => {
      state.statusGetMe = 'loading'
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.user = action.payload
      state.statusGetMe = 'loaded'
    },
    [fetchMe.rejected]: (state) => {
      state.user = {}
      state.statusGetMe = 'error'
    },
    [fetchWorkers.pending]: (state) => {
      state.statusWorkers = 'loading'
    },
    [fetchWorkers.fulfilled]: (state, action) => {
      state.workers = action.payload
      state.statusWorkers = 'loaded'
    },
    [fetchWorkers.rejected]: (state) => {
      state.workers = []
      state.statusWorkers = 'error'
    },
  },
})

export const usersReducer = usersSlice.reducer
