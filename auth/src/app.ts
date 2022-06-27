import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/sign-up';
import { signinRouter } from './routes/sign-in';
import { signoutRouter } from './routes/sign-out';
import { errorHandler } from '@eklavguild/common'
import 'express-async-errors';
import { InvalidPathError } from '@eklavguild/common';
import cookieSession from 'cookie-session';


const app = express();
app.set('trust proxy', true);
//incoming middlewares
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true,
}))
// routing
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(errorHandler);

app.all('*', async () => {
    throw new InvalidPathError();
});

export { app };