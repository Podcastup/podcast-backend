import {celebrate, Joi, Segments} from "celebrate";
import {NextFunction, Request, Response, Router} from "express";
import passport from 'passport';

import {IRequest, userController} from "../../controllers/user-controller";

const router = Router();

router.get("/user/test",
    (req: Request, res: Response) => userController.testRoute(req, res),
    );

router.get(
    "/user/login/:token",
    (req: Request, res: Response, next: NextFunction) => userController.getLoggedInUser(req, res),
);

router.post(
    "/user",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        }),
    }),
    (req:Request, res:Response, next:NextFunction) => userController.createRecord(req,res),
);

router.post(
    "/user/login",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        }),
    }),
    (req:Request, res:Response, next:NextFunction) => userController.loginUser(req,res),
);

router.get(
    "/user",
    (req: Request, res: Response, next: NextFunction) => userController.findAllRecords(req, res),
);

router.get(
    "/user/:id",
    (req: Request, res: Response, next: NextFunction) => userController.findOneRecord(req, res),
);

router.delete(
    '/user/:id',
    passport.authenticate('jwt', { session: false }, null),
    (req:Request, res:Response, next:NextFunction) => userController.deleteRecord(req, res),
);

router.put(
    "/user/:id",
    passport.authenticate('jwt', { session: false }, null),
    (req:Request, res:Response, next:NextFunction) => userController.updateRecord(req, res),
);

export default router