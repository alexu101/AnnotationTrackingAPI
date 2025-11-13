import {Project} from "./project.types.js"
import {User} from "./user.types.js"
import {File} from "./file.types.js"

export interface Task {
    id: string,
    priority: string,
    state: string,
    progress: number,
    startDate: Date,
    endDate: Date,
    project: Project,
    projectId: string,
    users: User[],
    files: File[],
    createdAt: Date,
    updatedAt: Date
}

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