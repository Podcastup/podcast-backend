import {Request, Response} from "express";
import BaseController from "../base/BaseController";
import {userService} from "../services";
import {IUser} from "../services/user-service";
import { HttpResponse, Validator } from "../utils";
import {TokenHelper} from "../helpers";
import {sendMail} from "../helpers/sendmail";
import passport from 'passport';
const MagicLinkStrategy = require('passport-magic-link').Strategy;

export interface IRequest extends Request{
    user: IUser
}

export default class UserController extends BaseController {
    /**
     * @param  {Request} req
     * @param  {Response} res
     */

    public async getLoggedInUser(req:Request, res: Response){
        const {token} = req.params;
        const decoded =await TokenHelper.decodeToken(token);

        const data = {
            email: decoded.email,
            uuid: decoded.uuid,
            id: decoded.id,
            access_token: token
        };

        return HttpResponse.sendResponse(res, true, 200, null as any, data);

    }

    public async loginUser(req:Request, res: Response){
        const {email} = req.body;
        const user = await this.service.findOne({where: {email}}, false);
        if(!user){
            return HttpResponse.sendResponse(
                res,
                false,
                400,
                "user with that email doesn't exist",
            )
        }
        const payload = {
            email: user.email,
            uuid: user.uuid,
            id: user.id
        }

        const data = {
            ...payload,
            access_token: await TokenHelper.generateToken(payload)
        };
        await  sendMail(email, data.access_token);
        return HttpResponse.sendResponse(res,true, 201, "Email Link Sent");

    }

    /**
     * @param  {Request} req
     * @param  {Response} res
     */

    public async createRecord(req:Request, res:Response){
        //check if user exists;
        if(await this.service.findOne({where:{email:req.body.email}})){
            return HttpResponse.sendErrorResponse(res, 409, "User exits", Error("User exits"));
        } else {
            return super.createRecord(req, res)
        }
    }
    public  async updateRecord(req:Request, res: Response) {
        //check if the user exists;
        if(await this.service.findOne({where: {id: req.params.id}})){
            return super.updateRecord(req, res);
        } else {
            return HttpResponse.sendErrorResponse(res, 404, "User does not exist", Error("User does not exist"));

        }

    }

    public  async deleteRecord(req:Request, res: Response) {
        //check if the user exists;
        if(await this.service.findOne({where: {id: req.params.id}})){
            return super.deleteRecord(req, res);
        } else {
            return HttpResponse.sendErrorResponse(res, 404, "User does not exist", Error("User does not exist"));

        }

    }
}

const userController = new UserController(userService, "User");
export {userController}