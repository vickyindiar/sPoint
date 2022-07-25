import express from 'express';
import { getVTypes, getVTypesById, createVTypes, updateVTypes, deleteVTypes  } from '../controllers/VTypeController.js';

const route = express.Router();
route.route('/')
     .get(getVTypes)
     .post(createVTypes);

route.route('/:id')
     .get(getVTypesById)
     .put(updateVTypes)
     .delete(deleteVTypes);
export default route;