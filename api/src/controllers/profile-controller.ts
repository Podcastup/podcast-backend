import { Request, Response, NextFunction} from "express";
import BaseController from "../base/BaseController";
import {
    TokenHelper,
} from "../helpers";
import {profileService, tokenService, userService} from "../services";
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
                role: decodedToken.role,
                email: decodedToken.email,
                uuid: decodedToken.uuid,
                id: decodedToken.id
            };
            if(data.role === 'user') {
                const user = await userService.findOne({where: {email: data.email}});
                return HttpResponse.sendResponse(res, true, 200, null as any, user);
            } return HttpResponse.sendResponse(
                res,
                false,
                400,
                "Admins do not need profiles",
            )
        }
    };

    public async update(req:Request, res: Response){
        const {firstName, lastName, bio, avatar} = req.body;
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
                role: decodedToken.role,
                email: decodedToken.email,
                uuid: decodedToken.uuid,
                id: decodedToken.id
            };
            const currentUser = data.uuid;
            if(data.role === 'user') {
                const options = { where: { currentUser} };
                await userService.updateOne(firstName, options);
                await userService.updateOne(lastName, options);
                await profileService.updateOne(data.uuid, options);
                await profileService.updateOne(bio, options);
                await profileService.updateOne(avatar, options);
                return HttpResponse.sendResponse(res, true, 200, null, {email: data.email, firstName, lastName, bio, avatar});
            }
        }
    };

}

const profileController = new ProfileController(profileService, "Profile");
export {profileController}