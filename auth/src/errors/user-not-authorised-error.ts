import { CustomError } from "./customErrorAbstract";

export class UserNotAuthorised extends CustomError {
    httpCodeMapping = 401;
    serializeError() {
        return [{ message: 'Unauthorised user'}]
    }

    constructor() {
        super('Unauthorised user');
        Object.setPrototypeOf(this, UserNotAuthorised.prototype);
    }
    
}