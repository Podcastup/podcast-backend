import {Request, Response} from "express";
import BaseController from "../base/BaseController";
import {tokenService, userService} from "../services";
import {IUser} from "../services/user-service";
import { HttpResponse, Validator } from "../utils";
import {PasswordHelper, TokenHelper} from "../helpers";
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
        const {email, password} = req.body;
        const user = await this.service.findOne({where: {email}}, false);
        if(!user){
            return HttpResponse.sendResponse(
                res,
                false,
                400,
                "user with that email doesn't exist",
            )
        }
        const matchedPassword = await PasswordHelper.comparePassword(password, user.password);
        const payload = {
            email: user.email,
            uuid: user.uuid,
            id: user.id
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

    /**
     * @param  {Request} req
     * @param  {Response} res
     */

    public async createRecord(req:Request, res:Response){
        const regex = /^(?=(.*[\W])+)(?=(.*?[A-Z])+)(?!.*\s).{7,32}$/;
        if(!regex.test(req.body.password)){
            return HttpResponse.sendErrorResponse
            (res, 400, "Password Error",
                Error("Please enter a password. It must contain a special character, a capital, and be 7-32 characters long"
                ));
        }
        //check if user exists;
        if(await this.service.findOne({where:{email:req.body.email}})){
            return HttpResponse.sendErrorResponse(res, 409, "User exits", Error("User exits"));
        } else {
            return super.createRecord(req, res)
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
                return HttpResponse.sendErrorResponse(res, 404, "User does not exist", Error("User does not exist"));

            }

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