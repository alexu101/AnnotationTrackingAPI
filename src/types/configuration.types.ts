import { Prisma } from "../generated/prisma/client.js";

export type ConfigurationWithRelations = Prisma.ConfigurationGetPayload<{
    include: {
        role: true,
        thresholds: true,
        projects: true
    }
}>

export interface ConfigurationCreationPayload {
    name: string,
    roleId: string,
    measurementUnit: string
}

export interface ConfigurationUpdatePayload {
    name: string,
    roleId: string,
    measurementUnit: string
}