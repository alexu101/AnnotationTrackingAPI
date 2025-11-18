import { prisma } from "../config/config.db.js";
import { FileCreationPayload, FileUpdatePayload, FileWithRelations } from "../types/file.types.js";

const fileRelations = {
    projects: true,
    fileInfos: true,
    tasks: true
}

export const createFileInDb = async (payload: FileCreationPayload): Promise<FileWithRelations | null> => {
    return await prisma.file.create({
        data: payload,
        include: fileRelations
    })
}

export const getFileByIdFromDb = async (id: string): Promise<FileWithRelations | null> => {
    return await prisma.file.findUnique({
        where: {
            id
        },
        include: fileRelations
    })
}

export const getFileByLocationFromDb = async (s3Location: string): Promise<FileWithRelations | null | 2> => {
    return await prisma.file.findFirst({
        where: {
            s3Location
        },
        include: fileRelations
    })
}

export const getAllFilesFromDb = async (): Promise<FileWithRelations[]> => {
    return await prisma.file.findMany({
        include: fileRelations
    })
}

export const updateFileInDb = async (id: string, payload: FileUpdatePayload): Promise<FileWithRelations | null> => {
    return await prisma.file.update({
        where: {
            id,
        },
        data: payload,
        include: fileRelations
    })
}

export const deleteFileFromDb = async (id: string): Promise<FileWithRelations | null> => {
    return await prisma.file.delete({
        where: {
            id
        },
        include: fileRelations
    })
}