import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios.js'

const initialState = {
  countries: [],
  status: null,
}

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  const { data } = await axios.get('country/all')
  return data
})

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCountries.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchCountries.fulfilled]: (state, action) => {
      state.countries = action.payload
      state.status = 'loaded'
    },
    [fetchCountries.rejected]: (state) => {
      state.countries = []
      state.status = 'error'
    },
  },
})

export const countriesReducer = countriesSlice.reducer
