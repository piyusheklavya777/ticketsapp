import { Router } from 'express';

const router = Router();

router.post('/api/users/signin', (request, response) => {
    console.log('GET /api/users/signin');
    response.send('GET /api/users/signin');
});

export { router as signinRouter };