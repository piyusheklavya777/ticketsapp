import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { currentUser } from './middlewares/current-user';
import { requireAuth } from './middlewares/require-auth';

const router = Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (request, response) => {
    console.log('GET /api/users/currentuser');

    return response.send({ curentUser: request.currentUser || null });
    
});

export { router as currentUserRouter };