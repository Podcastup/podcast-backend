import { Request, Response} from "express";
import BaseController from "../base/BaseController";
import {
    PasswordHelper,
    TokenHelper,
} from "../helpers";
import {adminService} from "../services";
import { IAdmin } from "../services/admin-service";
import { HttpResponse, Validator } from "../utils";
import {sendMail} from "../helpers/sendmail";

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

    public  async createRecord(req:Request, res: Response) {

        const {password, email, confirmPassword} = req.body;

        Validator.validateEmail(email);
        Validator.validatePassword(password);
        if(confirmPassword !== password){
            return HttpResponse.sendErrorResponse(res, 400, null, Error("Please confirm that the passwords are equal"));
        }

        //check if the user exists;
        if(await this.service.findOne({where: {email: req.body.email}})){
            return HttpResponse.sendErrorResponse(res, 400, "Admin with that email already exists", Error("Admin with that email already exists"));
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

    public async sendResetLink(req:Request, res:Response){
        const {email} = req.body;
        const user = await this.service.findOne({where: {email}}, false);
        if(!user){
            return HttpResponse.sendResponse(
                res,
                false,
                400,
                "user with that email doesn't exist",
            )
        } else {
            const payload = {
                email: user.email,
                uuid: user.uuid,
                id: user.id
            };

            const data = {
                ...payload,
                access_token: await TokenHelper.generateToken(payload)
            }

            const subject = 'Password reset Link';

            await  sendMail(email, data.access_token, subject);
            return HttpResponse.sendResponse(res,true, 201, "Email Link Sent");
        }
    }

    public async resetPassword(req:Request, res:Response){
        const {id} = req.params;
        const decoded =await TokenHelper.decodeToken(id);
        console.log(decoded, 'the token');

        const data = {
            email: decoded.email,
            access_token: id
        };
        console.log(data,'the data');
        if(await this.service.findOne({where: {email: data.email}})){
            console.log('got here');
            return super.updateRecord(req, res);
        }
    }


}

const adminController = new AdminController(adminService, "Admin");
export {adminController};