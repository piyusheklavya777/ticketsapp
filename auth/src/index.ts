import express from 'express';
import { json } from 'body-parser';

const app = express();

app.use(json());

// listening configuration
const PORT = process.env.EXPRESS_CONFIG_AUTH_PORT || 3001;

app.listen(PORT, () => {
    console.log(`AUTH service listening on PORT ${PORT}`);
});

// routing
