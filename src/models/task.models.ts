import { prisma } from "../config/config.db.js"
import {TaskUpdatePayload, TaskCreationPayload, TaskWithRelations } from "../types/task.types.js"

const taskRelations = {
    users: true,
    files: true,
    project: true,
}

export const createTaskInDb = async (taskCreationPayload: TaskCreationPayload): Promise<TaskWithRelations | null> => {
    return await prisma.task.create({
        data: taskCreationPayload,
        include: taskRelations
    })
}

export const getTaskByIdFromDb = async (id: string): Promise<TaskWithRelations | null> => {
    return await prisma.task.findUnique({
        where: {
            id
        },
        include: taskRelations
    })
}

export const getAllTasksFromDb = async (): Promise<TaskWithRelations[]> => {
    return await prisma.task.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: taskRelations
    })
}

export const updateTaskInDb = async (id: string, updates: TaskUpdatePayload): Promise<TaskWithRelations | null> => {
    return await prisma.task.update({
        where:{
            id
        },
        data: updates,
        include: taskRelations
    })
}

export const deleteTaskFromDb = async (id: string): Promise<TaskWithRelations | null> => {
    return await prisma.task.delete({
        where: {
            id
        },
        include: taskRelations
    })
}