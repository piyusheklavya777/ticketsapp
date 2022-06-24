import { Router } from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from './errors/request-validation-error';
import { User } from './models/user';
import _ from 'lodash';
import { UserAlreadyExists } from './errors/user-already-exists-error';

const router = Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .trim()
        .isLength({ min: 5, max: 15  })
        .withMessage('Invalid Password')
] , async (request : Request, response : Response) => {

    console.log('GET /api/users/signup');

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        console.log('failed validation', errors.array());
        throw new RequestValidationError(errors.array())
    }

    const email = _.get(request, ['body', 'email']);
    const password = _.get(request, ['body', 'password']);
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        console.log('USER ALREADY EXISTS');
        throw new UserAlreadyExists();
    }

    const newUser = User.build({
        email,
        password
    });

    await newUser.save();

    response.status(201).send({result: 'User created', newUser});
});

export { router as signupRouter };