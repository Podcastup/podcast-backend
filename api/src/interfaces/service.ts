import {CreateOptions, FindOptions, FindOrCreateOptions, UpdateOptions, WhereOptions} from "sequelize";

export interface IService<T>{
    findOne: (options: FindOptions) => Promise<any>;
    findAll: (options?: FindOptions) => Promise<T[]>;
    deleteOne: (options: WhereOptions) => Promise<boolean>;
    updateOne:(data: T, options: UpdateOptions) => Promise<any>;
    createOne: (data: T, options?: CreateOptions) => Promise<T>;
    findOrCreate: (options: FindOrCreateOptions) => Promise<{dataValues: T, isNewRecord:boolean}>;
}
