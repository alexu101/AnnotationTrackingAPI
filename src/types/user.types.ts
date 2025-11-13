import Project from "./project.types.js"
import WorkDay from "./workday.project.js"

export interface User {
    id: string
    name: string
    email: string
    roleId: string
    state: string
    norm: number
    level: string
    projects?: Project[]
    workDays?: WorkDay[]
    createdAt: Date
    updatedAt: Date
    password?: string
}

export interface UserUpdatePayload {
    name?: string
    email?: string
    state?: string
    norm?: number
    level?: string
}