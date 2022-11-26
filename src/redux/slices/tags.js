import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../api/axios.js'

const initialState = {
  tags: [],
  statusTag: null,
  tagsSelect: [],
}

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const { data } = await axios.get('tag/all')
  return data
})

export const fetchTagsSelected = createAsyncThunk('tags/fetchTagsSelected', async () => {
  const { data } = await axios.get('tag-select/all')
  return data
})

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTags.pending]: (state) => {
      state.statusTag = 'loading'
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags = action.payload
      state.statusTag = 'loaded'
    },
    [fetchTags.rejected]: (state) => {
      state.tags = []
      state.statusTag = 'error'
    },
    [fetchTagsSelected.pending]: (state) => {
      state.statusTag = 'loading'
    },
    [fetchTagsSelected.fulfilled]: (state, action) => {
      state.tagsSelect = action.payload
      state.statusTag = 'loaded'
    },
    [fetchTagsSelected.rejected]: (state) => {
      state.tagsSelect = []
      state.statusTag = 'error'
    },
  },
})

export const tagsReducer = tagsSlice.reducer
