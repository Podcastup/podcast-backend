
import {FindOptions} from "sequelize";
import BaseService from "../base/BaseService";
import { Notifications } from "../db/models/notifications";

export interface INotifications {
    id?: number;
    uuid?: string;
    email?: string;
    event?:string;
    message?:string;
    buttonText?: any;
    buttonLink?: string;
}

export default class NotificationsService extends BaseService<INotifications> {
    constructor() {
        super(Notifications, []);
    }

    public async findAll(options: FindOptions, exclude?: boolean): Promise<INotifications[]> {
        return super.findAll(options, true);
    }


}

const notificationsService = new NotificationsService();
export { notificationsService };