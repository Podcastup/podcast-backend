import { Request, Response} from "express";
import TokenHelper from '../helpers/token-helper';
import {sendNotification} from "../helpers/sendNotification";

 class NotificationsController{
    /**
     * @param  {Request} req
     * @param  {Response} res
     */
    static async sendNotifications(req:Request, res:Response){
        let accessTokens = req.body.data;
        for (let token of accessTokens) {
            const decoded = await TokenHelper.decodeToken(token);
            console.log(decoded);
            await sendNotification(decoded.user, decoded.event, token,decoded.buttonText, decoded.buttonLink, decoded.message);
        }
        return res
            .status(201)
            .send({ message: `The notification sent` });

    }
}

export default NotificationsController;