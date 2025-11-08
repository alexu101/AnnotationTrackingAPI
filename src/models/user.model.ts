import {prisma} from "../config/config.db.js"
import User from "../types/user.types.js"

export const getAllUsersFromDb = async (): Promise<User[]> => {
    return await prisma.user.findMany({
        orderBy:{
            createdAt: 'desc'
        },
        omit:{
            password: true
        },
        include:{
            workDays: true,
            projects: true
        }
    })
}

export const getUserByIdFromDb = async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        omit:{
            password: true
        },
        include:{
            workDays: true,
            projects: true
        }
    })
}

export const getUserByEmailFromDb = async (email: string, omitPassword: boolean = true): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            email
        },
        omit:{
            password: omitPassword
        },
        include:{
            workDays: true,
            projects: true,
        }
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
): Promise<User | null> => {
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
        include: {
            projects: true,
            workDays: true
        }
    })
}

export const updateUserInDb = async (
    id: string,
    updates: {
        name: string,
        roleId: string,
        state: string,
        level: string,
        norm: number
    }
): Promise<User | null> => {
    return await prisma.user.update({
        where: {
            id
        },
        data: updates,
        omit: {
            password: true
        },
        include: {
            workDays: true,
            projects: true
        }
    })
}

export const deleteUserFromDb = async (id: string):  Promise<User | null> => {
    return await prisma.user.delete({
        where: {
            id
        },
        omit: {
            password: true
        },
        include: {
            workDays: true,
            projects: true
        }
    })
}
