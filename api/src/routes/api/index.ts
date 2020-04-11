import {Router} from 'express';

import adminRoute from './admins.route';


const routes = Router();

routes.use('/', adminRoute);

export default routes;