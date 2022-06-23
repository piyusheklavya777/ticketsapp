import { CustomError } from "./customErrorAbstract";

export class InvalidPathError extends CustomError {
    httpCodeMapping = 404;
    serializeError() {
        return [{ message: 'Invalid Routing Path'}]
    }

    constructor() {
        super('Invalid Routing Path');
        Object.setPrototypeOf(this, InvalidPathError.prototype);
    }
    
}