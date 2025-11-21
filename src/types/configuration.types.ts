import { Prisma } from "../generated/prisma/client.js";

export type ConfigurationWithRelations = Prisma.ConfigurationGetPayload<{
    include: {
        role: true,
        thresholds: true,
        projects: true
    }
}>

export interface ConfigurationCreationPayload {
    name: String,
    roleId: String,
    measurementUnit: String
}

export interface ConfigurationUpdatePayload {
    name: String,
    roleId: String,
    measurementUnit: String
}