import {celebrate, Joi, Segments} from "celebrate";
import {NextFunction, Request, Response, Router} from "express";
import passport from 'passport';

import {IRequest, profileController} from "../../controllers/profile-controller";

const router = Router();

router.get(
    "/profile/me",
    passport.authenticate('jwt', { session: false }, null),
    (req: Request, res: Response, next: NextFunction) => profileController.getCurrentUser(req, res),
);


export default router;