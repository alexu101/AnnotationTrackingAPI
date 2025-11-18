import { Prisma } from "../generated/prisma/client.js"

export type FileWithRelations = Prisma.FileGetPayload<{
    include: {
        projects: true,
        fileInfos: true,
        tasks: true
    }
}>

export interface FileCreationPayload {
    name: string
    s3Location: string
}

export interface FileUpdatePayload {
    name?: string
    s3Location?: string
}
