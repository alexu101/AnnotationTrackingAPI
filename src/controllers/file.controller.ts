import { Request, Response, NextFunction } from "express";
import { FileCreationPayload, FileUpdatePayload, FileWithRelations } from "../types/file.types.js";
import { createFileInDb, deleteFileFromDb, getAllFilesFromDb, getFileByIdFromDb, getFileByLocationFromDb, updateFileInDb } from "../models/file.model.js";
import { ResourceConflictError } from "../errors/ResourceConflictError.js";
import ApiResponse from "../types/express.types.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export const createFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as FileCreationPayload

        const alreadyExistingFile = await getFileByLocationFromDb(payload.s3Location)
        if(alreadyExistingFile)
            throw new ResourceConflictError("File with this location already exists")

        const newFile = await createFileInDb(payload)

        if(!newFile)
            throw new Error("Internal Server Error: File could not be created")

        const response: ApiResponse<FileWithRelations> = {
            success: true,
            data: newFile,
            message: "File created successfully"
        }

        res.status(201).json(response)

    } catch (err) {
        next(err)
    }
}

export const getFileById = async (res: Response, req: Request, next: NextFunction) => {
    try {
        const id = req.params.id as string

        const file = await getFileByIdFromDb(id)

        if(!file)
            throw new NotFoundError("File not found")

        const response: ApiResponse<FileWithRelations> = {
            success: true,
            data: file,
            message: "File retrieved successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const getAllFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files  = await getAllFilesFromDb()

        const response: ApiResponse<FileWithRelations[]> = {
            success: true,
            data: files,
            message: "Files retrieved successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const payload = req.body as FileUpdatePayload

        const existingFile = await getFileByIdFromDb(id)

        if(!existingFile)
            throw new NotFoundError("File not found")

        const updatedFile = await updateFileInDb(id, payload)

        if(!updatedFile)
            throw new Error("Internal Server Error: File could not be updated")

        const response: ApiResponse<FileWithRelations> = {
            success: true,
            data: updatedFile,
            message: "File updated successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string

        const existingFile = await getFileByIdFromDb(id)

        if(!existingFile)
            throw new NotFoundError("File not found")

        const deletedFile = await deleteFileFromDb(id)

        if(!deletedFile)
            throw new Error("Internal Server Error: File could not be deleted")

        const response: ApiResponse<FileWithRelations> = {
            success: true,
            data: deletedFile,
            message: "File successfully deleted"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}