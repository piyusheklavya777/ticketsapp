
import { Router } from 'express';

const router = Router();

router.post('/api/users/signout', (request, response) => {
    console.log('GET /api/users/signout');

    request.session = null;
    response.send({});
});

export { router as signoutRouter };