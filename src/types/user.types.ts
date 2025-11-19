import { Prisma } from "../generated/prisma/client.js"

export type UserWithRelations = Prisma.UserGetPayload<{
    include: {
        workDays: true,
        projects: true
    },
    omit: {
        password: true
    }
}>

export interface UserCreationPayload {
    name: string,
    email: string,
    password: string,
    state: string,
    norm: number,
    level: string,
    role: string
}

export interface UserUpdatePayload {
    name?: string
    email?: string
    state?: string
    norm?: number
    level?: string
}