const request = require('supertest');
import app from "../../index";
import {db} from'../../db/models'


describe('Tests user endpoints', () => {
    it('Should test that the user route works', async () => {
        const response = await request(app)
            .get('/user/test')
            .expect(200);

        expect(response.body.message).toBe('ok');

    });
})