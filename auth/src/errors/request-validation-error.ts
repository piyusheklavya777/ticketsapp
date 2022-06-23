import { ValidationError } from "express-validator";
import { CustomError } from "./customErrorAbstract";

// interface customError {
//     httpCodeMapping : number,
//     serializeError() : {
//         message: string,
//         field: string,
//     }[]
//  }

export class RequestValidationError extends CustomError {
    httpCodeMapping = 400;
    constructor(public errors: ValidationError[]) {
        super('Request parameter ill formatted');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeError() {
        return this.errors?.map(error => {
                return { message: error.msg, field: error.param }
            })
    }
}