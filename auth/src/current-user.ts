import { Router } from 'express';

const router = Router();

router.get('/api/users/currentuser', (request, response) => {
    console.log('GET /api/users/currentuser');
    response.send('GET /api/users/currentuser');
});

export { router as currentUserRouter };