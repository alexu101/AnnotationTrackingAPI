import { prisma } from "../config/config.db.js"
import { Task, TaskUpdatePayload, TaskCreationPayload } from "../types/task.types.js"

export const createTaskInDb = async (taskCreationPayload: TaskCreationPayload): Promise<Task | null> => {
    return await prisma.task.create({
        data: taskCreationPayload,
        include: {
            users: true,
            files: true,
            project: true,
        }
    })
}

export const getTaskByIdFromDb = async (id: string): Promise<Task | null> => {
    return await prisma.task.findUnique({
        where: {
            id
        },
        include: {
            users: true,
            files: true,
            project: true
        }
    })
}

export const getAllTasksFromDb = async (): Promise<Task[]> => {
    return await prisma.task.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            users: true,
            files: true,
            project: true
        }
    })
}

export const updateTaskInDb = async (id: string, updates: TaskUpdatePayload): Promise<Task | null> => {
    return await prisma.task.update({
        where:{
            id
        },
        data: updates,
        include: {
            users: true,
            project: true,
            files: true
        }
    })
}

export const deleteTaskFromDb = async (id: string): Promise<Task | null> => {
    return await prisma.task.delete({
        where: {
            id
        },
        include: {
            project: true,
            files: true,
            users: true
        }
    })
}