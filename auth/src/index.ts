import mongoose from 'mongoose';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { app } from './app';

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