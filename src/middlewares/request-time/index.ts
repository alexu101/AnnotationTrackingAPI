import { NextFunction, Request, Response } from "express";

const requestTime = (req: Request, res: Response, next: NextFunction) => {
    const currentDate = new Date(Date.now()).toDateString()
    req.requestTime = currentDate

    next()
}

export default requestTime