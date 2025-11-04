import { NextFunction, Request, Response} from "express";

const myLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log('LOGGED')
    next()
}

export default myLogger