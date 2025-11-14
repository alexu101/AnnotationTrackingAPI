import { Prisma } from "../generated/prisma/client.js"

export type TaskWithRelations = Prisma.TaskGetPayload<{
    include: {
        project: true,
        users: true,
        files: true
  }
}>

export interface TaskCreationPayload {
    name: string,
    priority: string,
    state: string,
    startDate: Date,
    endDate: Date,
    projectId: string
}

export interface TaskUpdatePayload {
    name?: string,
    priority?: string,
    state?: string,
    progress?: number,
    startDate?: Date,
    endDate?: Date
}