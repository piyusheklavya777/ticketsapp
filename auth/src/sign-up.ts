import { Router } from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from './errors/request-validation-error';
import _ from 'lodash';

const router = Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .trim()
        .isLength({ min: 5, max: 15  })
        .withMessage('Invalid Password')
] ,(request : Request, response : Response) => {

    console.log('GET /api/users/signup');

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        console.log('failed validation', errors.array());
        throw new RequestValidationError(errors.array())
    }
    
    console.log('...creating user');

    response.status(201).send({result: 'User created'});
});

export { router as signupRouter };