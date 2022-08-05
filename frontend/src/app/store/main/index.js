import { combineReducers } from '@reduxjs/toolkit';
import classes from './classesSlice';
import teachers from './teachersSlice';
import students from './studentsSlice';

const mainReducers = combineReducers({
  classes, teachers, students
});

export default mainReducers;