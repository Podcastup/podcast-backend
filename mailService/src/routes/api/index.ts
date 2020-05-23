import {Router} from 'express';

import notificationsRoute from './notifications.route';


const routes = Router();

routes.use('/', notificationsRoute);

export default routes;