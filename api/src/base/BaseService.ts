
import { CreateOptions, FindOptions, FindOrCreateOptions, UpdateOptions, WhereOptions } from "sequelize";
import {IService} from "../interfaces";

export default class BaseService<T> implements IService<T> {
    public model :any;
    protected excludedFields?: string[];
    /**
     * @param  {Model} model
     * @param excludedFields
     */
    constructor(model: any, excludedFields?: string[]) {
        this.model = model;
        this.excludedFields = excludedFields;
    }
    /**
     * @param  {T} data
     * @param options
     * @returns Promise
     */
    public async createOne(data: T, options?: CreateOptions): Promise<T> {
        const result = await this.model.create({ ...data, ...options });
        return result;
    }

    /**
     * @returns Promise
     * @param options
     * @param exclude
     */
    public async findAll(options: FindOptions, exclude?: boolean): Promise<T[]> {
        const result = await this.model.findAll({...options, attributes:
                {exclude: exclude && [...this.excludedFields]}});
        return result;
    }

    /**
     * @returns Promise
     * @param options
     * @param exclude
     */
    public async findOne(options: FindOptions, exclude?: boolean): Promise<T> {
        const result = await this.model.findOne({
            ...options,
            attributes: {exclude: exclude && [...this.excludedFields]},
        });
        return result;
    }

    /**
     * @returns Promise
     * @param options
     */
    public async deleteOne(options: WhereOptions): Promise<boolean> {

        const result = await this.model.destroy({
            ...options,
        });

        return result;
    }

    /**
     * @param  {object} data
     * @param options
     * @returns Promise
     */
    public async updateOne(data: T, options: UpdateOptions): Promise<any> {

        const results = await this.model.update(
            {...data}, {...options} );

        return  results ;
    }

    /**
     * @param  {object} options
     * @returns Promise
     */
    public async findOrCreate(options: FindOrCreateOptions): Promise<{dataValues: T, isNewRecord: boolean}> {
        const [result] = await this.model.findOrCreate({...options});
        const { dataValues, _options: {isNewRecord} } = result;
        return  { dataValues, isNewRecord };
    }

}