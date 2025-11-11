import { Response, Request, NextFunction } from "express"
import { getAllProjectsFromDb } from "../models/project.model.js"
import ApiResponse from "../types/express.types.js"

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await getAllProjectsFromDb()

        const response: ApiResponse<Project[]> = {
            success: true,
            data: projects,
            message: 'Projects retrieved successfully'
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}