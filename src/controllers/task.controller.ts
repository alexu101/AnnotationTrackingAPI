import { Request, Response, NextFunction } from "express";
import { TaskCreationPayload, TaskUpdatePayload, TaskWithRelations } from "../types/task.types.js";
import { ResourceConflictError } from "../errors/ResourceConflictError.js";
import { getProjectByIdFromDb, getProjectByNameFromDb } from "../models/project.model.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { createTaskInDb, deleteTaskFromDb, getAllTasksFromDb, getTaskByIdFromDb, updateTaskInDb } from "../models/task.models.js";
import ApiResponse from "../types/express.types.js";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newTaskData = req.body as TaskCreationPayload

        const taskProject = await getProjectByIdFromDb(newTaskData.projectId)

        if(!taskProject)
            throw new NotFoundError("Specified project for task not found")

        const taskAlreadyExisting = taskProject.tasks.find(t => t.name === newTaskData.name)

        if(taskAlreadyExisting)
            throw new ResourceConflictError(`Task with name ${newTaskData.name} already existing on specified project`)

        const newTask = await createTaskInDb(newTaskData)

        if(!newTask)
            throw new Error("Internal Server Error: Task creation failed")

        const response: ApiResponse<TaskWithRelations> = {
            success: true,
            data: newTask,
            message: "Task created successfully"
        }

        res.status(201).json(response)
    } catch(err) {
        next(err)
    }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const task = await getTaskByIdFromDb(id)

        if(!task)
            throw new NotFoundError(`Task not found`)

        const response: ApiResponse<TaskWithRelations> = {
            success: true,
            data: task,
            message: "Task successfully retrieved"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getAllTasksFromDb()

        const response: ApiResponse<TaskWithRelations[]> = {
            success: true,
            data: tasks,
            message: "Tasks retrieved successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const updates = req.body as TaskUpdatePayload

        const task = await getTaskByIdFromDb(id)

        if(!task)
            throw new NotFoundError('Task not found')

        if (updates.name){
            const taskProject = await getProjectByNameFromDb(task.projectId)
            if (!taskProject)
                throw new Error('Internal Server Error')

            const isNewNameUnique = taskProject.tasks.find(t => t.name === updates.name)

            if(!isNewNameUnique)
                throw new ResourceConflictError('Project with the same name already exists')
        }

        const updatedTask = await updateTaskInDb(id, updates)

        if(!updatedTask)
            throw Error("Internal server error: Task could not be updated")

        const response: ApiResponse<TaskWithRelations> = {
            success: true,
            data: updatedTask,
            message: "Task updated successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string

        const deletedTask = await deleteTaskFromDb(id)

        if(!deletedTask)
            throw new NotFoundError("Task not found")

        const response: ApiResponse<TaskWithRelations> = {
            success: true,
            data: deletedTask,
            message: "Task deleted successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}