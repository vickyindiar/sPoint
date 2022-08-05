
import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  searchText: '' ,
  teacherDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
}

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setTeachersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewTeacherDialog: (state, action) => {
      state.teacherDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewTeacherDialog: (state, action) => {
      state.teacherDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditTeacherDialog: (state, action) => {
      state.teacherDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditTeacherDialog: (state, action) => {
      state.teacherDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
})

export const { setTeachersSearchText, openNewTeacherDialog, openEditTeacherDialog, closeEditTeacherDialog, closeNewTeacherDialog } = teachersSlice.actions;

export default teachersSlice.reducer;