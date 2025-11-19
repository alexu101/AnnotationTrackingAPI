import { Response, Request, NextFunction } from "express"
import { createProjectInDb, deleteProjectFromDb, getAllProjectsFromDb, getProjectByIdFromDb, getProjectByNameFromDb, updateProjectInDb } from "../models/project.model.js"
import ApiResponse from "../types/express.types.js"
import { ProjectUpdatePayload, ProjectCreationPayload, ProjectWithRelations } from "../types/project.types.js"
import { NotFoundError } from "../errors/NotFoundError.js"
import { ResourceConflictError } from "../errors/ResourceConflictError.js"
import { BadRequestError } from "../errors/BadRequestError.js"

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await getAllProjectsFromDb()

        const response: ApiResponse<ProjectWithRelations[]> = {
            success: true,
            data: projects,
            message: 'Projects retrieved successfully'
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const project = await getProjectByIdFromDb(id)

        if(!project)
            return new NotFoundError("Project not found")

        const response: ApiResponse<ProjectWithRelations> = {
            success: true,
            data: project,
            message: 'Project retrieved successfully'
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as ProjectCreationPayload

        const existingProject = await getProjectByNameFromDb(payload.name)

        if(!existingProject)
            throw new ResourceConflictError("Project with specified name already exists")

        const newProject = await createProjectInDb(payload)

        if(!newProject)
            throw new BadRequestError("Project could not be created")

        const response: ApiResponse<ProjectWithRelations> = {
            success: true,
            data: newProject,
            message: 'Project created successfully'
        }

        res.status(201).json(response)
    } catch(err) {
        next(err)
    }
}

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string

        const existingProject = await getProjectByIdFromDb(id)

        if(!existingProject)
            throw new NotFoundError("Project not found")

        const updates = req.body as ProjectUpdatePayload
        const updatedProject = await updateProjectInDb(id, updates)

        if(!updatedProject)
            throw new Error("Internal server error: Project update failed")

        const response: ApiResponse<ProjectWithRelations> = {
            success: true,
            data: updatedProject,
            message: 'Project updated successfully'
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}

export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id as string

        const existingProject = await getProjectByIdFromDb(id)

        if(!existingProject)
            throw new NotFoundError("Project not found")

        const deletedProject = await deleteProjectFromDb(id)

        if(!deletedProject)
            throw new Error("Internal server error: Project deletion failed")

        const response: ApiResponse<ProjectWithRelations> = {
            success: false,
            data: deletedProject,
            message: "User deleted successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}