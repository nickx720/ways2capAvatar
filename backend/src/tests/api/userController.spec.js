const path = require('path');
const fs = require('fs');
const util = require('util');
const request = require('supertest');
const express = require('express');

const app = express();
const userController = require('../../api/controllers/users/userController');

const readFile = util.promisify(fs.readFile);

const dataPath = path.join(__dirname, '..', '..', '..', 'mocks/user-test.json');

const setUpMockDb = () => {
    let data;
    return readFile(dataPath)
        .then((value) => {
            data = JSON.parse(value.toString('utf-8'));
            return data;
        })
        .catch((err) => {
            data = err;
            return data;
        });
};
describe('User Controller', () => {
    beforeEach(() => {
        jest.resetModules();
        process.env.ENVIRONMENT = 'test';
    });

    test('List users', () => {
        request(app).get('/users').expect(200);
    });
    test('List users by id', () => {
        request(app).get('/users/1').expect(200);
    });
});
