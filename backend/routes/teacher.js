import express from 'express';
import { getTeachers, getTeachersById, createTeachers, updateTeachers, deleteTeachers  } from '../controllers/teacherController.js';

const route = express.Router();
route.route('/')
     .get(getTeachers)
     .post(createTeachers);

route.route('/:id')
     .get(getTeachersById)
     .put(updateTeachers)
     .delete(deleteTeachers);
export default route;