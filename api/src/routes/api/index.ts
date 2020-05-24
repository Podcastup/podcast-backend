import {Router} from 'express';

import adminRoute from './admins.route';
import userRoute from './users.route';


const routes = Router();

routes.use('/', adminRoute);
routes.use('/', userRoute);

export default routes;