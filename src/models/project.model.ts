import { prisma } from "../config/config.db.js";
import {ProjectCreationPayload, ProjectUpdatePayload, ProjectWithRelations} from "../types/project.types.js";

const projectRelations = {
    tasks: true,
    files: true,
    configurations: true,
    users: true
}

export const getProjectByIdFromDb = async (id: string): Promise<ProjectWithRelations | null> => {
    return await prisma.project.findUnique({
        where :{
            id
        },
        include: projectRelations
    })
}

export const getProjectByNameFromDb = async (name: string): Promise<ProjectWithRelations | null> => {
    return await prisma.project.findUnique({
        where: {
            name
        },
        include: projectRelations
    })
}

export const getAllProjectsFromDb = async (): Promise<ProjectWithRelations[]> => {
    return await prisma.project.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        include: projectRelations
    })
}

export const createProjectInDb = async (data: ProjectCreationPayload): Promise<ProjectWithRelations | null> => {
    return await prisma.project.create({
        data,
        include: projectRelations
    })
}

export const updateProjectInDb = async (
    id: string,
    updates: ProjectUpdatePayload
): Promise<ProjectWithRelations | null> => {
    return await prisma.project.update({
        where: {
            id
        },
        data: updates,
        include: projectRelations
    })
}

export const deleteProjectFromDb = async (id: string): Promise<ProjectWithRelations | null> => {
    return await prisma.project.delete({
        where: {
            id
        },
        include: projectRelations
    })
}