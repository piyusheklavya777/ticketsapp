import request from 'supertest';
import { app } from '../../app';

describe('unit test', () => {
    test('app should return 201 on signup', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'user1@lysto.io',
                password: 'aljv5t2y5',
            })
            .expect(201);
    });
})