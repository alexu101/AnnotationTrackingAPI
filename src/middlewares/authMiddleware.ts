import { Response, Request, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import jwt from 'jsonwebtoken'
import { jwtSecret } from "../config/config.env.js";
import { TokenPayload } from "../types/auth.types.js";


export const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token)
            throw new UnauthorizedError("Unauthorized operation")

        const payload: TokenPayload = jwt.verify(token, jwtSecret) as TokenPayload
        req.userId = payload.userId
        next()
    } catch(err){
        next(err)
    }
}