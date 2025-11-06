import { CustomError } from "./CustomError.js";

export class BadRequestError extends CustomError {
    constructor(message: string){
        super(message, 400, "BAD_REQUEST")
    }
}