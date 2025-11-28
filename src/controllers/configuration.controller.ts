import { Response, Request, NextFunction } from "express";
import { ConfigurationCreationPayload, ConfigurationUpdatePayload, ConfigurationWithRelations } from "../types/configuration.types.js";
import { createConfigurationInDb, deleteConfigurationFromDb, getAllConfigurationsFromDb, getConfigurationByIdFromDb, getConfigurationByNameFromDb, updateConfigurationInDb } from "../models/configuration.model.js";
import { ResourceConflictError } from "../errors/ResourceConflictError.js";
import ApiResponse from "../types/express.types.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export const createConfiguration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as ConfigurationCreationPayload

        const existingConfiguration = await getConfigurationByNameFromDb(payload.name)

        if(existingConfiguration)
            throw new ResourceConflictError("Configuration with specified name already existing")

        const newConfiguration = await createConfigurationInDb(payload)

        if(!newConfiguration)
            throw new Error("Internal Server Error: Configuration could not be created")

        const response: ApiResponse<ConfigurationWithRelations> = {
            success: true,
            data: newConfiguration,
            message: "Configuration created successfully"
        }

        res.status(201).json(response)
    } catch(err) {
        next(err)
    }
}

export const getConfigurationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string

        const configuration = await getConfigurationByIdFromDb(id)

        if(!configuration)
            throw new NotFoundError("Configuration not found")

        const response: ApiResponse<ConfigurationWithRelations> = {
            success: true,
            data: configuration,
            message: "Configuration created successfully"
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}

export const getAllConfigurations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const configurations = await getAllConfigurationsFromDb()

        const response: ApiResponse<ConfigurationWithRelations[]> = {
            success: true,
            data: configurations,
            message: "Configurations retrieved successfully"
        }

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export const updateConfiguration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const payload = req.body as ConfigurationUpdatePayload

        const configuration = await getConfigurationByIdFromDb(id)

        if(!configuration)
            throw new NotFoundError("Configuration not found")

        const updatedConfiguration = await updateConfigurationInDb(id, payload)

        if(!updatedConfiguration)
            throw new Error("Internal Server Error: Update failed")

        const response: ApiResponse<ConfigurationWithRelations> = {
            success: true,
            data: updatedConfiguration,
            message: "Configuration updated successfully"
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }
}

export const deleteConfiguration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string

        const configuration = await getConfigurationByIdFromDb(id)

        if(!configuration)
            throw new NotFoundError("Configuration not found")

        const deletedConfiguration = await deleteConfigurationFromDb(id)

        if(!deletedConfiguration)
            throw new Error("Internal Server Error: Configuration could not be deleted")

        const response: ApiResponse<ConfigurationWithRelations> = {
            success: true,
            data: deletedConfiguration,
            message: "Configuration deleted successfully"
        }

        res.status(200).json(response)

    } catch(err) {
        next(err)
    }
}