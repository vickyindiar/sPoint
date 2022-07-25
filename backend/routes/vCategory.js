import express from 'express';
import { getVCategories, getVCategoriesById, createVCategories, updateVCategories, deleteVCategories  } from '../controllers/VCategoryController.js';

const route = express.Router();
route.route('/')
     .get(getVCategories)
     .post(createVCategories);

route.route('/:id')
     .get(getVCategoriesById)
     .put(updateVCategories)
     .delete(deleteVCategories);
export default route;