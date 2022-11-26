import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios.js'

const initialState = {
  genders: [],
  status: null,
}

export const fetchGenders = createAsyncThunk('genders/fetchGenders', async () => {
  const { data } = await axios.get('gender/all')
  return data
})

const gendersSlice = createSlice({
  name: 'genders',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGenders.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchGenders.fulfilled]: (state, action) => {
      state.genders = action.payload
      state.status = 'loaded'
    },
    [fetchGenders.rejected]: (state) => {
      state.genders = []
      state.status = 'error'
    },
  },
})

export const gendersReducer = gendersSlice.reducer
