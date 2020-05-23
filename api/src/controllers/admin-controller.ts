import { Request, Response, NextFunction} from "express";
import BaseController from "../base/BaseController";
import {
    PasswordHelper,
    TokenHelper,
} from "../helpers";
import {adminService} from "../services";
import { IAdmin } from "../services/admin-service";
import { HttpResponse, Validator } from "../utils";
const fetch = require('node-fetch');

export interface IRequest extends Request {
    admin: IAdmin;
}

let accessToken;

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
        const matchedPassword = await PasswordHelper.comparePassword(password, admin.password)

        const payload = {
            email: admin.email,
            uuid: admin.uuid,
            id: admin.id
        };

        const data = {
            ...payload,
            access_token: await TokenHelper.generateToken(payload)
        };
        accessToken = data.access_token;
        return matchedPassword ?
            HttpResponse.sendResponse(res, true, 200, null as any, data) :
            HttpResponse.sendResponse(res, false, 400,
                "email and password don't match");
    }

    public async logoutUser(req:Request, res:Response){}

    public async forgotPassword(req:Request, res:Response, next:NextFunction){
        const {email, buttonLink, buttonText } = req.body;
        if (!email || !buttonLink || !buttonText) {
            return res.status(400).send({
                message:
                    'One or more required fields is missing, please check the values you have provided',
            });
        }
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
            // notifications.setSender(existingUser.id);
            // notifications.setEvent('forgot password');
            // notifications.setButtonText(buttonText);
            // notifications.setButtonLink(buttonLink);
            // await notifications.save();

            const payload = {
                user: email,
                userId: existingUser.id,
                event: 'forgot password',
                buttonText,
                buttonLink,
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
        //check if the user exists;
        if(await this.service.findOne({where: {email: req.body.email}})){
            return HttpResponse.sendErrorResponse(res, 409, "Admin with that email already exists", Error("Admin with that email already exists"));
        } else {
            return super.createRecord(req, res);
        }

    }

    public  async updateRecord(req:Request, res: Response) {
        //check if the user exists;
        if(await this.service.findOne({where: {uuid: req.params.uuid}})){
            return super.updateRecord(req, res);
        } else {
            return HttpResponse.sendErrorResponse(res, 404, "Admin user does not exist", Error("Admin user does not exist"));

        }

    }

    public  async deleteRecord(req:Request, res: Response) {
        //check if the user exists;
        if(await this.service.findOne({where: {uuid: req.params.uuid}})){
            return super.deleteRecord(req, res);
        } else {
            return HttpResponse.sendErrorResponse(res, 404, "Admin user does not exist", Error("Admin user does not exist"));

        }

    }

    public async getCurrentUser(req:Request, res: Response) {

        const decodedToken = await TokenHelper.decodeToken(accessToken);
        const data = {
            email: decodedToken.email,
            uuid: decodedToken.uuid,
            id: decodedToken.id
        };
        return HttpResponse.sendResponse(res, true, 200, null as any, data);
    };


}

const adminController = new AdminController(adminService, "Admin");
export {adminController};