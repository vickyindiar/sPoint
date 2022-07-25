import { combineReducers } from '@reduxjs/toolkit';
import classes from './classesSlice';

const mainReducers = combineReducers({
  classes
});

export default mainReducers;