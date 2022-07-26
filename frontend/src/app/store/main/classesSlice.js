
import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  searchText: '' ,
  classDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
}

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
    openNewClassDialog: (state, action) => {
      state.classDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewClassDialog: (state, action) => {
      state.classDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditClassDialog: (state, action) => {
      state.classDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditClassDialog: (state, action) => {
      state.classDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
})

export const { setClassesSearchText, openNewClassDialog, openEditClassDialog, closeEditClassDialog, closeNewClassDialog } = classesSlice.actions;

export default classesSlice.reducer;