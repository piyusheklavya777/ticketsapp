import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;
// jest.setTimeout(15000);
beforeAll(async () => {
    try {
        // mongo = new MongoMemoryServer();
        // // await setTimeout(() => console.log('wait ended'), 1000);
        // const mongoUri = await mongo.getUri();
        // console.log(`mongo uri: `, mongoUri);
        // await mongoose.connect(mongoUri);
        // console.log('mongoose connected');
        //
        // mongo = await MongoMemoryServer.create();
        // console.log(`created mms instance`);
        // const mongoUri = mongo.getUri();
        // console.log(`mongoUri: `, mongoUri);
        // await mongoose.connect(mongoUri);
        //
        console.log('CONNECTING')
        await mongoose.connect(process.env['MONGO_URI']!);

    } catch (e) {
        console.log(`error connecting:`, { e });
    }
});

beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})