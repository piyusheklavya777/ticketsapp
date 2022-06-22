import { Router } from 'express';
import { Request, Response } from 'express';
import { v}

const router = Router();

router.post('/api/users/signup', [] ,(request : Request, response : Response) => {
    console.log('GET /api/users/signup');
    response.send('GET /api/users/signup');
});

export { router as signupRouter };