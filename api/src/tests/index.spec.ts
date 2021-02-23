import supertest from 'supertest';

import app from '../index'

const env = process.env;


export const DATABASE_URL = `${env.DATABASE_URL}`;

const version = '/';

export class BaseTest {
    static appInstance = supertest(app);

    static get = url => {
        return BaseTest.appInstance.get(`${version}${url}`);
    };

    static post = url => {
        return BaseTest.appInstance.post(`${version}${url}`);
    };

    static put = url => {
        return BaseTest.appInstance.put(`${version}${url}`);
    };

    static delete = url => {
        return BaseTest.appInstance.delete(`${version}${url}`);
    };

}
