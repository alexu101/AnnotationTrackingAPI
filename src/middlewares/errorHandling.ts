import { NextFunction, Request, Response } from "express"
import { environment } from "../config/config.env.js";
import ApiResponse from "../types/express.types.js";
import { CustomError } from "../errors/CustomError.js";
import logger from "../utils/utils.logging.js";
import { ErrorLog } from "../types/logging.types.js";

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

    const logMeta: ErrorLog = {
        method: req.method,
        path: req.path,
        statusCode: errorStatusCode,
        errorType,
        stack: environment === 'dev' ? err.stack : undefined
    }

    logger.error(err.message, logMeta)

    const response: ApiResponse<any> = {
        success: false,
        message: errorMessage,
    }

    res.status(errorStatusCode).json(response)
};