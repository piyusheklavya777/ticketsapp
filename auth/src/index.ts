import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './current-user';
import { signupRouter } from './sign-up';
import { signinRouter } from './sign-in';
import { signoutRouter } from './sign-out';
import { errorHandler } from './middlewares/error-handler'
import 'express-async-errors';
import mongoose from 'mongoose';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { InvalidPathError } from './errors/invalid-path-error';

const app = express();
//incoming middlewares
app.use(json());

// listening configuration
const PORT = process.env.EXPRESS_CONFIG_AUTH_PORT || 3000;

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongodb-service:27017/auth');
        console.log('connected')
    } catch (e) {
        console.error('ERROR trying to connect to db', e);
        throw new DatabaseConnectionError();
    }

    app.listen(PORT, () => {
        console.log(`AUTH service listening on PORT ${PORT}`);
    });
}
start();

// routing
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async () => {
    throw new InvalidPathError();
})

// outgoing middlewares
app.use(errorHandler);

// utilities
