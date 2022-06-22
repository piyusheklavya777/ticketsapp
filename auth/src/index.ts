import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './current-user';
import { signupRouter } from './sign-up';
import { signinRouter } from './sign-in';
import { signoutRouter } from './sign-out';
const app = express();
// middlewares
app.use(json());

// listening configuration
const PORT = process.env.EXPRESS_CONFIG_AUTH_PORT || 3000;

app.listen(PORT, () => {
    console.log(`AUTH service listening on PORT ${PORT}`);
});

// routing
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);