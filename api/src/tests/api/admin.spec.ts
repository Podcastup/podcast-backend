import chai from 'chai';
const { expect } = chai;

import {BaseTest} from "../index.spec";


describe('Tests for user registration', () => {
    it('Should sign-up a new user', async () => {
        const response = await BaseTest.get('admin').send({});
        expect(response.status).to.equal(200);

    });
})
