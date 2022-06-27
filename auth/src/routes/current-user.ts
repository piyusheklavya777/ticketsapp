import { Router } from 'express';
import { currentUser } from '@eklavguild/common';
import { requireAuth } from '@eklavguild/common';

const router = Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (request, response) => {
    console.log('GET /api/users/currentuser');

    return response.send({ curentUser: request.currentUser || null });
    
});

export { router as currentUserRouter };