
import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (request, response) => {
    console.log('GET /api/users/signout');
    response.send('GET /api/users/signout');
});

export { router as signoutRouter };