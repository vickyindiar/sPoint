
import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  searchText: '' ,
  studentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
}

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudentsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewStudentDialog: (state, action) => {
      state.studentDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewStudentDialog: (state, action) => {
      state.studentDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditStudentDialog: (state, action) => {
      state.studentDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditStudentDialog: (state, action) => {
      state.studentDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
})

export const { setStudentsSearchText, openNewStudentDialog, openEditStudentDialog, closeEditStudentDialog, closeNewStudentDialog } = studentsSlice.actions;

export default studentsSlice.reducer;