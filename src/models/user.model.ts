import {prisma} from "../config/config.db.js"
import {UserWithRelations, UserUpdatePayload } from "../types/user.types.js"

const userRelations = {
    workDays: true,
    projects: true
}

export const getAllUsersFromDb = async (): Promise<UserWithRelations[]> => {
    return await prisma.user.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        omit:{
            password: true
        },
        include: userRelations
    })
}

export const getUserByIdFromDb = async (id: string): Promise<UserWithRelations | null> => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        omit:{
            password: true
        },
        include: userRelations
    })
}

export const getUserByEmailFromDb = async (email: string, omitPassword: boolean = true): Promise<UserWithRelations | null> => {
    return await prisma.user.findUnique({
        where: {
            email
        },
        omit:{
            password: omitPassword
        },
        include: userRelations
    })
}

export const createUserInDb = async (
    name: string,
    email: string,
    state: string,
    level: string,
    norm: number,
    password: string,
    roleId: string
): Promise<UserWithRelations | null> => {
    return await prisma.user.create({
        data: {
            name,
            email,
            state,
            level,
            norm,
            password,
            roleId
        },
        omit: {
            password: true
        },
        include: userRelations
    })
}

export const updateUserInDb = async (
    id: string,
    updates: UserUpdatePayload
): Promise<UserWithRelations | null> => {
    return await prisma.user.update({
        where: {
            id
        },
        data: updates,
        omit: {
            password: true
        },
        include: userRelations
    })
}

export const deleteUserFromDb = async (id: string):  Promise<UserWithRelations | null> => {
    return await prisma.user.delete({
        where: {
            id
        },
        omit: {
            password: true
        },
        include: userRelations
    })
}
