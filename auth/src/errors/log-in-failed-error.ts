import { CustomError } from "./customErrorAbstract";

export class LoginFailed extends CustomError {
    httpCodeMapping = 400;
    serializeError() {
        return [{ message: 'Log in attempt failed'}]
    }

    constructor() {
        super('Log in attempt failed');
        Object.setPrototypeOf(this, LoginFailed.prototype);
    }
    
}