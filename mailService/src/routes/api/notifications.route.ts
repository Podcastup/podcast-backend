import { Request, Response, Router} from "express";

import NotificationsController from "../../controllers/notifications-controller";

const router = Router();

router.get('/notifications', (req:Request, res:Response) => {
    res.json({ ok: true });
});

router.post(
    '/notifications/sendNotification',
    NotificationsController.sendNotifications
);

export default router;