import express from 'express';
import { getRoles, getRoleById, createRole, updateRole, deleteRole  } from '../controllers/roleController.js';

const route = express.Router();
route.route('/')
     .get(getRoles)
     .post(createRole);

route.route('/:id')
     .get(getRoleById)
     .put(updateRole)
     .delete(deleteRole);
export default route;