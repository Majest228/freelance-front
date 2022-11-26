import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios.js'

const initialState = {
  languages: [],
  status: null,
}

export const fetchLanguages = createAsyncThunk('languages/fetchLanguages', async () => {
  const { data } = await axios.get('language/all')
  return data
})

const languagesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLanguages.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchLanguages.fulfilled]: (state, action) => {
      state.languages = action.payload
      state.status = 'loaded'
    },
    [fetchLanguages.rejected]: (state) => {
      state.languages = []
      state.status = 'error'
    },
  },
})

export const languagesReducer = languagesSlice.reducer
