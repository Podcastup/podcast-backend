import {Router} from 'express';

import adminRoute from './admins.route';
import userRoute from './users.route';
import profileRoute from './profile.route'


const routes = Router();

routes.use('/', adminRoute);
routes.use('/', userRoute);
routes.use('/', profileRoute)

export default routes;