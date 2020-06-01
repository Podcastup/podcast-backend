
import {FindOptions} from "sequelize";
import BaseService from "../base/BaseService";
import { User } from "../db/models/user";

export interface IUser {
    password?: string;
    id?: number;
    email?: string;
    firstName?:string;
    lastName?:string;
    dataValues?: any;
    uuid?: string;
}

export default class UserService extends BaseService<IUser> {
    constructor() {
        super(User, ["password"]);
    }

    public async findAll(options: FindOptions, exclude?: boolean): Promise<IUser[]> {
        return super.findAll(options, true);
    }


}

const userService = new UserService();
export { userService };