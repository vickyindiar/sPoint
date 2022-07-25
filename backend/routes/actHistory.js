import express from 'express';
import { getActHistories, getActHistoriesById, createActHistories, updateActHistories, deleteActHistories  } from '../controllers/ActHistoryController';

const route = express.Router();
route.route('/')
     .get(getActHistories)
     .post(createActHistories);

route.route('/:id')
     .get(getActHistoriesById)
     .put(updateActHistories)
     .delete(deleteActHistories);
export default route;