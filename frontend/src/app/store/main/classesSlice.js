
import { createSlice } from '@reduxjs/toolkit'

const initialState = { searchText: '' }

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClassesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
})

export const { setClassesSearchText } = classesSlice.actions;

export default classesSlice.reducer;