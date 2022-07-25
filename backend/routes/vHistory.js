import express from 'express';
import { getVHistories, getVHistoriesById, createVHistories, updateVHistories, deleteVHistories  } from '../controllers/VHistoryController.js';

const route = express.Router();
route.route('/')
     .get(getVHistories)
     .post(createVHistories);

route.route('/:id')
     .get(getVHistoriesById)
     .put(updateVHistories)
     .delete(deleteVHistories);
export default route;