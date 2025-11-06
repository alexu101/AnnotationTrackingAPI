import { NextFunction, Request, Response } from "express"
import { environment } from "../config/config.env.js";
import ApiResponse from "../types/express.types.js";
import { CustomError } from "../errors/CustomError.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let errorType = 'INTERNAL_SERVER_ERROR';
    let errorStatusCode = 500;
    let errorMessage = err.message;

    if (err instanceof CustomError) {
        errorStatusCode = err.statusCode
        errorType = err.type
        errorMessage = err.message
    } else if (environment !== 'dev') {
        errorMessage = 'Internal server error'
    }
    console.error(`Request ${req.method} ${req.path} failed with status code ${errorStatusCode} - ${errorType}: ${err.message}`)

    const response: ApiResponse<any> = {
        success: false,
        message: errorMessage,
    }

    if (environment === 'dev'){
        console.error(`Error stack: ${err.stack}`)
        response.errorStack = err.stack || 'No error stack'
    }

    res.status(errorStatusCode).json(response)
};