import { Request, Response, NextFunction} from "express";
import BaseController from "../base/BaseController";
import {
    TokenHelper,
} from "../helpers";
import {profileService, tokenService} from "../services";
import {IProfile} from "../services/profile-service";
import {HttpResponse} from "../utils";

export interface IRequest extends Request{
    profile: IProfile;

}

export default class ProfileController extends BaseController{
    /**
     * @param  {Request} req
     * @param  {Response} res
     */

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

}

const profileController = new ProfileController(profileService, "Profile");
export {profileController}