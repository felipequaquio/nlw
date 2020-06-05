import express from 'express';
import CollectPointsController from '../src/controllers/CollectPointsController';
import ItemsController from '../src/controllers/ItemsController';

const routes = express.Router();
const collect_points_controller = new CollectPointsController();
const items_controller = new ItemsController();

routes.get('/items', items_controller.index);
routes.get('/collect-point', collect_points_controller.index);
routes.post('/collect-point', collect_points_controller.create);
routes.get('/collect-point/:id', collect_points_controller.show);

export default routes; 