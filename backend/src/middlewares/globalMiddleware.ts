import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { Service } from "../utils/service";
import { IDecodedToken } from "../interface/decodedToken";
export class GlobalMiddleware {
    static CheckValidation(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(Service.CreateErrorResponse(errors.array()[0].msg, 400));
        }
        next();
    }
    static async CheckAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                next(Service.CreateErrorResponse("Unauthorized", 401));
            }
            const decodedToken = Service.VerifyJWTToken(token) as IDecodedToken;
            if (!decodedToken) {
                next(Service.CreateErrorResponse("Invalid token", 401));
            }
            req.body.userID = decodedToken.userID;
            next();
        } catch (error) {
            next(error);
        }
    }
}
