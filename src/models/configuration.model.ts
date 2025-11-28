import { prisma } from "../config/config.db.js";
import { ConfigurationCreationPayload, ConfigurationUpdatePayload, ConfigurationWithRelations } from "../types/configuration.types.js";

const configurationRelations = {
    role: true,
    thresholds: true,
    projects: true
}

export const createConfigurationInDb = async (data: ConfigurationCreationPayload): Promise<ConfigurationWithRelations | null> => {
    return await prisma.configuration.create({
        data,
        include: configurationRelations
    })
}

export const getConfigurationByIdFromDb = async (id: string): Promise<ConfigurationWithRelations | null> => {
    return await prisma.configuration.findUnique({
        where: {
            id
        },
        include: configurationRelations
    })
}

export const getConfigurationByNameFromDb = async (name: string): Promise<ConfigurationWithRelations | null> => {
    return await prisma.configuration.findUnique({
        where: {
            name
        },
        include: configurationRelations
    })
}

export const getConfigurationsByProjectFromDb = async (projectId: string): Promise<ConfigurationWithRelations[]> => {
    return await prisma.configuration.findMany({
        where: {
            projects: {
                some: {
                    id: projectId
                }
            }
        },
        include: configurationRelations
    })
}

export const getAllConfigurationsFromDb = async (): Promise<ConfigurationWithRelations[]> => {
    return await prisma.configuration.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        include: configurationRelations
    })
}

export const updateConfigurationInDb = async (id: string, data: ConfigurationUpdatePayload): Promise<ConfigurationWithRelations | null> => {
    return await prisma.configuration.update({
        data,
        where: {
            id
        },
        include: configurationRelations
    })
}

export const deleteConfigurationFromDb = async (id: string) => {
    return await prisma.configuration.delete({
        where: {
            id
        },
        include: configurationRelations
    })
}