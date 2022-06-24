import { CustomError } from "./customErrorAbstract";

export class DatabaseConnectionError extends CustomError {
    httpCodeMapping = 500;
    serializeError() {
        return [{ message: 'Error connecting to the database'}]
    }

    constructor() {
        super('Error connecting to the database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    
}