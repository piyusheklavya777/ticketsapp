import { Request, Response, NextFunction } from "express";
import { UserNotAuthorised } from "../errors/user-not-authorised-error";

export const requireAuth = (request: Request, response: Response, next: NextFunction) => {
    if (!request.currentUser) {
        throw new UserNotAuthorised();
    }
    console.log('user login succeeded');
    next();
}