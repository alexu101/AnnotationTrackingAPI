import { Request, Response, NextFunction } from "express";
import { TaskCreationPayload } from "../types/task.types.js";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskData = req.body as TaskCreationPayload
    } catch(err) {
        next(err)
    }
}