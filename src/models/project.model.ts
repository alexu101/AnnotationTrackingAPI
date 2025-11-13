import { prisma } from "../config/config.db.js";
import { Prisma } from '@prisma/client'
import {Project, ProjectUpdatePayload} from "../types/project.types.js";

const projectWithRelations = Prisma.validator

export const getProjectByIdFromDb = async (id: string): Promise<Project | null> => {
    return await prisma.project.findUnique({
        where :{
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

export const getProjectByNameFromDb = async (name: string): Promise<Project | null> => {
    return await prisma.project.findUnique({
        where: {
            name
        },
        include: {
            tasks: true,
            files: true,
            configurations: true,
            users: true
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
            configurations: true,
            users: true
        }
    })
}

export const createProjectInDb = async (
    name: string,
    description: string,
    priority: string,
    state: string,
    autoFileAssignation?: boolean,
    multipleFileAssignation?: boolean
): Promise<Project | null> => {
    return await prisma.project.create({
      data: {
        name,
        description,
        priority,
        state,
        autoFileAssignation: autoFileAssignation ?? false,
        multipleFileAssignation: multipleFileAssignation ?? false
    },
    include: {
        tasks: true,
        files: true,
        configurations: true,
        users: true
    }})
}

export const updateProjectInDb = async (
    id: string,
    updates: ProjectUpdatePayload
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