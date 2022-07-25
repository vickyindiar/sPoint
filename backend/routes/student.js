import express from 'express';
import { getStudents, getStudentsById, createStudents, updateStudents, deleteStudents  } from '../controllers/StudentController.js';

const route = express.Router();
route.route('/')
     .get(getStudents)
     .post(createStudents);

route.route('/:id')
     .get(getStudentsById)
     .put(updateStudents)
     .delete(deleteStudents);
export default route;