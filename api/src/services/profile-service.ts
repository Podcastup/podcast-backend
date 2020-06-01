import {FindOptions} from "sequelize";
import BaseService from "../base/BaseService";
import {Profile} from "../db/models/profile";

export interface IProfile {
    id?: number;
    avatar?: string;
    bio?: string;
    firstName?:string;
    lastName?:string;
    dataValues?: any;
    uuid?: string;
}

export default class ProfileService extends BaseService<IProfile>{
    constructor() {
        super(Profile, []);

    }
    public async findAll(options: FindOptions, exclude?:boolean): Promise<IProfile[]>{
        return super.findAll(options, true)
    }


}

const profileService = new ProfileService();
export  {profileService}