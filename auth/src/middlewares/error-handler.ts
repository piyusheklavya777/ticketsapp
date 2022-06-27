import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/customErrorAbstract";


export const errorHandler = (
    error : Error,
    request : Request,
    response : Response,
    next : NextFunction
    ) => {
        try {
            console.log('Error handler invoked!', error);

            if (error instanceof CustomError) {
                return response.status(error.httpCodeMapping).send({errors: error.serializeError()});
            }
    
            response.status(400).send({message: error.message});
            next();

        } catch (e) {
            console.log('Error in the error handler middleware', e);
            response.status(400).send({message: 'Error in the error handler middleware'});
            next();
        }

    }