const request = require('supertest');
import app from "../../index";
import {db} from'../../db/models'


describe('Tests for user registration', () => {
    it('Should sign-up a new user', async () => {
        await request(app)
            .get('/admin')
            .expect(200);

    });
})