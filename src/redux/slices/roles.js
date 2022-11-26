import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios.js'

const initialState = {
  roles: [],
  statusRoles: null,
}

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const { data } = await axios.get('role/all')
  return data
})

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRoles.pending]: (state) => {
      state.statusRoles = 'loading'
    },
    [fetchRoles.fulfilled]: (state, action) => {
      state.roles = action.payload
      state.statusRoles = 'loaded'
    },
    [fetchRoles.rejected]: (state) => {
      state.roles = []
      state.statusRoles = 'error'
    },
  },
})

export const rolesReducer = rolesSlice.reducer
