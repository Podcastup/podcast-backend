
import {FindOptions} from "sequelize";
import BaseService from "../base/BaseService";
import { Admin } from "../db/models/admin";

export interface IAdmin {
    password?: string;
    id?: number;
    email?: string;
    firstName?:string;
    lastName?:string;
    dataValues?: any;
    uuid?: string;
}

export default class AdminService extends BaseService<IAdmin> {
    constructor() {
        super(Admin, ["password"]);
    }

    public async findAll(options: FindOptions, exclude?: boolean): Promise<IAdmin[]> {
        return super.findAll(options, true);
    }


}

const adminService = new AdminService();
export { adminService };