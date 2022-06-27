import { Router } from 'express';
import { currentUser, requireAuth } from '@eklavguild/common';

const router = Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  (request, response) => {
    console.log('GET /api/users/currentuser');

    return response.send({ currentUser: request.currentUser || null });
  },
);

export { router as currentUserRouter };
