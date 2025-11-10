import { CustomError } from "./CustomError.js";

export class UnauthorizedError extends CustomError {
    constructor(message: string){
        super(message, 401, 'UNAUTHORIZED')
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
}