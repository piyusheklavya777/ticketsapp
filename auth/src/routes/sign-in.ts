import { Router } from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '@eklavguild/common';
import { User } from '../models/user';
import _ from 'lodash';
import { LoginFailed } from '@eklavguild/common';
import Password from '../services/password';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .trim()
        .isLength({ min: 5, max: 15  })
        .withMessage('Invalid Password')
],
 async (request : Request, response: Response) => {

    console.log('POST /api/users/signin');

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        console.log('failed validation', errors.array());
        throw new RequestValidationError(errors.array())
    }

    const email = _.get(request, ['body', 'email']);
    const password = _.get(request, ['body', 'password']);
    
    const userDetails = await User.findOne({ email });
    if (!userDetails) throw new LoginFailed();

    console.log({ userDetails, compare: await Password.compare(userDetails.password, password)});

    if (!userDetails || await !Password.compare(userDetails.password, password)) {
        console.log(`Invalid Credentials email: ${email}, password: ${password}`);
        throw new LoginFailed();
    }

    const newToken = jwt.sign({
        id: userDetails.id,
        email: userDetails.email,
    }, process.env.JWT_KEY!);

    _.set(request, ['session', 'jwt'], newToken);

    response.status(200).send({result: 'Login Successful !'});
   
});

export { router as signinRouter };