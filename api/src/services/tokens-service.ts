
import {FindOptions} from "sequelize";
import BaseService from "../base/BaseService";
import { Token } from "../db/models/tokens";

export interface IToken {
    id?: number;
    uuid?: string;
    token?: string;

}

export default class TokenService extends BaseService<IToken> {
    constructor() {
        super(Token, []);
    }

    public async findAll(options: FindOptions, exclude?: boolean): Promise<IToken[]> {
        return super.findAll(options, true);
    }


}

const tokenService = new TokenService();
export { tokenService };