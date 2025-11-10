import { CustomError } from "./CustomError.js";

export class BadRequestError extends CustomError {
    constructor(message: string){
        super(message, 400, "BAD_REQUEST")
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}