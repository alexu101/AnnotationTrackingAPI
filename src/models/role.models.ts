import {prisma} from "../config/config.db.js"
import { RoleWithRelations } from "../types/role.types.js"

const roleRelations = {
    permissions: true
}

export const getRoleByRoleNameFromDb = async (roleName: string): Promise<RoleWithRelations | null> => {
    return await prisma.role.findUnique({
        where: {
            name: roleName
        },
        include: roleRelations
    })
}

export const getRoleByIdFromDb = async (id: string): Promise<RoleWithRelations | null> => {
    return await prisma.role.findUnique({
        where: {
            id
        },
        include: roleRelations
    })
}