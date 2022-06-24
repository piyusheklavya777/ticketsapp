import { CustomError } from "./customErrorAbstract";

export class UserAlreadyExists extends CustomError {
    httpCodeMapping = 409;
    serializeError() {
        return [{ message: 'User already exists with the same credentials'}]
    }

    constructor() {
        super('User already exists with the same credentials');
        Object.setPrototypeOf(this, UserAlreadyExists.prototype);
    }
    
}