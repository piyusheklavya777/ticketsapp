import { Router } from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '@eklavguild/common';
import { User } from '../models/user';
import _ from 'lodash';
import { UserAlreadyExists } from '@eklavguild/common';
import jwt from 'jsonwebtoken';

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

    console.log('POST /api/users/signup');

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

    const newToken = jwt.sign({
        id: newUser.id,
        email: newUser.email,
    }, process.env.JWT_KEY!);

    _.set(request, ['session', 'jwt'], newToken);



    response.status(201).send({result: 'User created', newUser});
});

export { router as signupRouter };