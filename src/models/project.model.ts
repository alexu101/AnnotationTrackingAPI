import { prisma } from "../config/config.db.js";
import Project from "../types/project.types.js";

export const getProjectByIdFromDb = async (id: string): Promise<Project | null> => {
    return await prisma.project.findUnique({
        where :{
            id
        },
        include: {
            tasks: true,
            files: true,
            configurations: true
        }
    })
}

export const getAllProjectsFromDb = async (): Promise<Project[]> => {
    return await prisma.project.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        include: {
            tasks: true,
            files: true,
            configurations: true
        }
    })
}

export const createProjectInDb = async (
    name: string,
    description: string,
    priority: string,
    state: string
): Promise<Project | null> => {
    return await prisma.project.create({
      data: {
        name,
        description,
        priority,
        state
    },
    include: {
        tasks: true,
        files: true,
        configurations: true
    }})
}

export const updateProjectInDb = async (
    id: string,
    updates: {
        name: string
        description: string,
        priority: string,
        state: string
    }
): Promise<Project | null> => {
    return await prisma.project.update({
        where: {
            id
        },
        data: updates,
        include: {
            tasks: true,
            files: true,
            configurations: true,
            users: true
        }
    })
}

export const deleteProjectFromDb = async (id: string): Promise<Project | null> => {
    return await prisma.project.delete({
        where: {
            id
        },
        include: {
            tasks: true,
            files: true,
            configurations: true,
            users: true
        }
    })
}