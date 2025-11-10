import {prisma} from "../config/config.db.js"
import { Role } from "../types/role.types.js"

export const getRoleByRoleNameFromDb = async (roleName: string): Promise<Role | null> => {
    return await prisma.role.findUnique({
        where: {
            name: roleName
        },
        include: {
            permissions: true
        }
    })
}

export const getRoleByIdFromDb = async (id: string): Promise<Role | null> => {
    return await prisma.role.findUnique({
        where: {
            id
        },
        include: {
            permissions: true
        }
    })
}