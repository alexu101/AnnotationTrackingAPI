import { CustomError } from "./CustomError.js";

export class ResourceConflictError extends CustomError {
    constructor(message: string){
        super(message, 409, "RESOURCE_CONFLICT")
    }
}