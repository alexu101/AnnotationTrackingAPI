import { Response, Request, NextFunction } from "express"
import { createProjectInDb, deleteProjectFromDb, getAllProjectsFromDb, getProjectByIdFromDb, getProjectByNameFromDb, updateProjectInDb } from "../models/project.model.js"
import ApiResponse from "../types/express.types.js"
import Project from "../types/project.types.js"
import { NotFoundError } from "../errors/NotFoundError.js"
import { ResourceConflictError } from "../errors/ResourceConflictError.js"
import { BadRequestError } from "../errors/BadRequestError.js"
import ProjectUpdatePayload from "../types/project.types.js"

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

export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const project = await getProjectByIdFromDb(id)

        if(!project)
            return new NotFoundError("Project not found")

        const response: ApiResponse<Project> = {
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
        const {
            name,
            description,
            priority,
            state,
            autoFileAssignation,
            multipleFileAssignation
        } = req.body

        const existingProject = await getProjectByNameFromDb(name)

        if(!existingProject)
            throw new ResourceConflictError("Project with specified name already exists")

        const newProject = await createProjectInDb(name, description, priority, state, autoFileAssignation, multipleFileAssignation)

        if(!newProject)
            throw new BadRequestError("Project could not be created")

        const response: ApiResponse<Project> = {
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

        const response: ApiResponse<Project> = {
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

        const response: ApiResponse<Project> = {
            success: false,
            data: deletedProject,
            message: "User deleted successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}