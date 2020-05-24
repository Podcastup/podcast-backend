import {celebrate, Joi, Segments} from "celebrate";
import {NextFunction, Request, Response, Router} from "express";
import passport from 'passport';


import {IRequest, adminController} from "../../controllers/admin-controller";

const router = Router();


router.post(
    "/admin/login",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        }),
    }),
    (req: Request, res: Response, next: NextFunction) => adminController.loginUser(req, res),
);

router.post(
    "/admin/logout",
    passport.authenticate('jwt', { session: false }, null),
    (req: Request, res: Response, next: NextFunction) => adminController.logoutUser(req, res),
);

router.post(
    "/admin",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        }),
    }),
    (req: Request, res: Response, next: NextFunction) => adminController.createRecord(req, res),
);

router.post(
    "/admin/forgotPassword",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            buttonLink: Joi.string().required(),
            buttonText: Joi.string().required(),
            message: Joi.string().required()
        }),
    }),
    (req: Request, res: Response, next: NextFunction) => adminController.forgotPassword(req, res, next),
);

router.post(
    "/admin/passwordChanged",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            buttonLink: Joi.string().required(),
            buttonText: Joi.string().required(),
            message: Joi.string().required()
        }),
    }),
    (req: Request, res: Response, next: NextFunction) => adminController.passwordChanged(req, res, next),
);

router.post(
    "/admin/upcomingEvent",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            buttonLink: Joi.string().required(),
            buttonText: Joi.string().required(),
            message: Joi.string().required()
        }),
    }),
    (req: Request, res: Response, next: NextFunction) => adminController.upcomingEvent(req, res, next),
);



router.get(
    "/admin",
    (req: Request, res: Response, next: NextFunction) => adminController.findAllRecords(req, res),
);
router.delete(
    "/admin/:id",
    passport.authenticate('jwt', { session: false }, null),
    (req: Request, res: Response, next: NextFunction) => adminController.deleteRecord(req, res),
);

router.put(
    "/admin/:id",
    passport.authenticate('jwt', { session: false }, null),
    (req: Request, res: Response, next: NextFunction) => adminController.updateRecord(req, res),
);

router.get(
    "/admin/me",
    passport.authenticate('jwt', { session: false }, null),
    (req: Request, res: Response, next: NextFunction) => adminController.getCurrentUser(req, res),
);


export default router;