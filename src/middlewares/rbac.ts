import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { getUserByIdFromDb } from "../models/user.model.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { getRoleByIdFromDb, getRoleByRoleNameFromDb } from "../models/role.models.js";

export const rbac = (permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId

            if(!userId)
                throw new UnauthorizedError('Not authorized operation')

            const authorizedUser = await getUserByIdFromDb(userId)

            if(!authorizedUser)
                throw new NotFoundError('User not found')

            const userRole = await getRoleByIdFromDb(authorizedUser.roleId)

            if(!userRole)
                throw new NotFoundError('Invalid role')

            const isAllowed = userRole.permissions.some((perm) => perm.value === permission)

            if(!isAllowed)
                throw new UnauthorizedError('Access denied')

            next()
        } catch(err) {
            next(err)
        }
    }
}