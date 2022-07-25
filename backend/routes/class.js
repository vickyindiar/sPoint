import express from 'express';
import { getClasses, getClassesById, createClasses, updateClasses, deleteClasses  } from '../controllers/ClassController.js';

const route = express.Router();
route.route('/')
     .get(getClasses)
     .post(createClasses);

route.route('/:id')
     .get(getClassesById)
     .put(updateClasses)
     .delete(deleteClasses);
export default route;