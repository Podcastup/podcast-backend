import { Request, Response, NextFunction} from "express";
import BaseController from "../base/BaseController";
import {IController} from "../interfaces";
import {
    PasswordHelper,
    TokenHelper,
} from "../helpers";
import {adminService, notificationsService, tokenService} from "../services";
import { IAdmin } from "../services/admin-service";
import { HttpResponse, Validator } from "../utils";
const fetch = require('node-fetch');

export interface IRequest extends Request {
    admin: IAdmin;
}



export default class AdminController extends BaseController{
    /**
     * @param  {Request} req
     * @param  {Response} res
     */

    public async loginUser(req:Request, res: Response){
        const {email, password} = req.body;
        const admin = await this.service.findOne({where: {email}}, false);
        if(!admin){
            return HttpResponse.sendResponse(
                res,
                false,
                400,
                "user with that email doesn't exist",
            )
        }
        const matchedPassword = await PasswordHelper.comparePassword(password, admin.password);

        const payload = {
            role:'admin',
            email: admin.email,
            uuid: admin.uuid,
            id: admin.id
        };

        const data = {
            ...payload,
            access_token: await TokenHelper.generateToken(payload)
        };
        return matchedPassword ?
            HttpResponse.sendResponse(res, true, 200, null as any, data) :
            HttpResponse.sendResponse(res, false, 400,
                "email and password don't match");
    }

    public async logoutUser(req:Request, res:Response){
        if (req && req.headers && req.headers.authorization) {
            const token =
                req.headers.authorization.split(' ').pop() || '';
            await tokenService.createOne({token});
            return res.status(201).json({
                message: 'Token have successfully logged out',
                success: true,
            });

        } else {
            return res.status(409).send({
                message:
                    'You are not authorized to access this resource, please log in',
            });
        }

    }

    public async forgotPassword(req:Request, res:Response, next:NextFunction){
        const {email, buttonLink, buttonText, message } = req.body;

        const existingUser = await this.service.findOne({where: {email}}, false);
        if(!existingUser){
            return HttpResponse.sendResponse(
                res,
                false,
                400,
                "user with that email doesn't exist",
            )
        } else {
            let access_token = [];
            await notificationsService.createOne({
                email,
                buttonLink,
                buttonText,
                message,
                event:'forgotPassword'
            });

            const payload = {
                user: email,
                userId: existingUser.id,
                event: 'forgot password',
                buttonText,
                buttonLink,
                message
            };

            const data = {
                ...payload,
                access_token: await TokenHelper.generateToken(payload),
            };
            // @ts-ignore
            access_token.push(data.access_token);

            const body = { data: access_token };

            try {
                fetch(
                    `http://localhost:7000/notifications/sendNotification`,
                    {
                        method: 'post',
                        body: JSON.stringify(body),
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                    .then(res => {
                        res.json();
                    })
                    .then(json => console.log('sent the message'))
                    .catch(e => console.log('Error :', e));
                return res.status(201).send({
                    message: 'The forgot Password link has been sent',
                });
            } catch (e) {
                console.log('Error: ', e);
                next();
            }
        }

    }

    public async passwordChanged(req:Request, res:Response, next:NextFunction){
        const {email, buttonLink, buttonText, message } = req.body;

        const existingUser = await this.service.findOne({where: {email}}, false);
        if(!existingUser){
            return HttpResponse.sendResponse(
                res,
                false,
                400,
                "user with that email doesn't exist",
            )
        } else {
            let access_token = [];
            await notificationsService.createOne({
                email,
                buttonLink,
                buttonText,
                message,
                event:'passwordChanged'
            });

            const payload = {
                user: email,
                userId: existingUser.id,
                event: 'password changed',
                buttonText,
                buttonLink,
                message
            };

            const data = {
                ...payload,
                access_token: await TokenHelper.generateToken(payload),
            };
            // @ts-ignore
            access_token.push(data.access_token);

            const body = { data: access_token };

            try {
                fetch(
                    `http://localhost:7000/notifications/sendNotification`,
                    {
                        method: 'post',
                        body: JSON.stringify(body),
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                    .then(res => {
                        res.json();
                    })
                    .then(json => console.log('sent the message'))
                    .catch(e => console.log('Error :', e));
                return res.status(201).send({
                    message: 'The forgot Password link has been sent',
                });
            } catch (e) {
                console.log('Error: ', e);
                next();
            }
        }

    }

    public  async createRecord(req:Request, res: Response) {
        const regex = /^(?=(.*[\W])+)(?=(.*?[A-Z])+)(?!.*\s).{7,32}$/;
        if(!regex.test(req.body.password)){
            return HttpResponse.sendErrorResponse
            (res, 400, "Password Error",
                Error("Please enter a password. It must contain a special character, a capital, and be 7-32 characters long"
                ));
        }
        //check if the user exists;
        if(await this.service.findOne({where: {email: req.body.email}})){
            return HttpResponse.sendErrorResponse(res, 409, "Admin with that email already exists", Error("Admin with that email already exists"));
        } else {
            return super.createRecord(req, res);
        }

    }

    public  async updateRecord(req:Request, res: Response) {
        if (req && req.headers && req.headers.authorization) {
            const token =
                req.headers.authorization.split(' ').pop() || '';

            const checkToken = await tokenService.findOne({where: {token}});
            if (checkToken) {
                return res.status(409).send({
                    message:
                        'You are not authorized to access this resource, please log in',
                });
            }
            //check if the user exists;
            if (await this.service.findOne({where: {id: req.params.id}})) {
                return super.updateRecord(req, res);
            } else {
                return HttpResponse.sendErrorResponse(res, 404, "Admin user does not exist", Error("Admin user does not exist"));

            }
        }

    }

    public  async deleteRecord(req:Request, res: Response) {
        if (req && req.headers && req.headers.authorization) {
            const token =
                req.headers.authorization.split(' ').pop() || '';
            const checkToken = await tokenService.findOne({where: {token}});
            if(checkToken){
                return res.status(409).send({
                    message:
                        'You are not authorized to access this resource, please log in',
                });
            }
            //check if the user exists;
            if (await this.service.findOne({where: {uuid: req.params.uuid}})) {
                return super.deleteRecord(req, res);
            } else {
                return HttpResponse.sendErrorResponse(res, 404, "Admin user does not exist", Error("Admin user does not exist"));

            }
        }
    }

    public async getCurrentUser(req:Request, res: Response) {
        if (req && req.headers && req.headers.authorization) {
            const token =
                req.headers.authorization.split(' ').pop() || '';

            const checkToken = await tokenService.findOne({where: {token}});
            if(checkToken){
                return res.status(409).send({
                    message:
                        'You are not authorized to access this resource, please log in',
                });
            }
            const decodedToken = await TokenHelper.decodeToken(token);
            const data = {
                email: decodedToken.email,
                uuid: decodedToken.uuid,
                id: decodedToken.id
            };
            const user = await this.service.findOne({where: {email: data.email}});
            return HttpResponse.sendResponse(res, true, 200, null as any, user);
        }
    };

    public async upcomingEvent(req:Request, res:Response, next:NextFunction){
        const {email, buttonLink, buttonText, message } = req.body;

        const existingUser = await this.service.findOne({where: {email}}, false);
        if(!existingUser){
            return HttpResponse.sendResponse(
                res,
                false,
                400,
                "user with that email doesn't exist",
            )
        } else {
            let access_token = [];
            await notificationsService.createOne({
                email,
                buttonLink,
                buttonText,
                message,
                event: 'upcoming event',
            });

            const payload = {
                user: email,
                userId: existingUser.id,
                event: 'upcoming event',
                buttonText,
                buttonLink,
                message
            };

            const data = {
                ...payload,
                access_token: await TokenHelper.generateToken(payload),
            };
            // @ts-ignore
            access_token.push(data.access_token);

            const body = { data: access_token };

            try {
                fetch(
                    `http://localhost:7000/notifications/sendNotification`,
                    {
                        method: 'post',
                        body: JSON.stringify(body),
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                    .then(res => {
                        res.json();
                    })
                    .then(json => console.log('sent the message'))
                    .catch(e => console.log('Error :', e));
                return res.status(201).send({
                    message: 'The forgot Password link has been sent',
                });
            } catch (e) {
                console.log('Error: ', e);
                next();
            }
        }

    }


}

const adminController = new AdminController(adminService, "Admin");
export {adminController};