import e, {NextFunction, Request, Response} from 'express'
import bcrypt from 'bcrypt'
import ApiResponse from '../types/express.types.js'
import {User, UserUpdatePayload} from '../types/user.types.js'
import { createUserInDb, deleteUserFromDb, getAllUsersFromDb, getUserByEmailFromDb, getUserByIdFromDb, updateUserInDb } from '../models/user.model.js'
import { getRoleByRoleNameFromDb } from '../models/role.models.js'
import { NotFoundError } from '../errors/NotFoundError.js'
import { ResourceConflictError } from '../errors/ResourceConflictError.js'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersFromDb()

        const response: ApiResponse<User[]> ={
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        }
        res.status(200).json(response)

    } catch (err) {
        next(err)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, state, level, password, norm, role} = req.body

        const existingUser = await getUserByEmailFromDb(email)
        if (existingUser)
            throw new ResourceConflictError(`User with email ${email} already exists`)

        const hashedPassword = await bcrypt.hash(password, 10)

        const userRole = await getRoleByRoleNameFromDb(role)

        if (!userRole){
            throw new NotFoundError('Invalid role')
        }

        const newUser = await createUserInDb(name, email, state, level, norm, hashedPassword, userRole.id)

        if(!newUser) {
            throw new Error('Internal Server error: User creation failed')
        }

        const response: ApiResponse<User> = {
            success: true,
            data: newUser,
            message: "User created successfully"
        }
        res.status(201).json(response)

    } catch(err){
        next(err)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id as string
        const updates = req.body as UserUpdatePayload

        const existingUser = await getUserByIdFromDb(id)

        if (!existingUser){
            throw new NotFoundError('User not found')
        }

        const updatedUser = await updateUserInDb(id, updates)

        if(!updatedUser){
            throw new Error('Internal Server error: User update failed')
        }

        const response: ApiResponse<User> = {
            success: true,
            data: updatedUser,
            message: 'User updated successfully'
        }
        res.status(200).json(response)

    } catch (err){
        next(err)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string

        const user = await getUserByIdFromDb(id)

        if(!user){
            throw new NotFoundError("User not found")
        }

        const response: ApiResponse<User> = {
            success:true,
            data: user,
            message: "User retrieved successfully"
        }
        res.status(200).json(response)
    }
     catch (err){
        next(err)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id as string

        const user = await getUserByIdFromDb(id)

        if(!user){
            throw new NotFoundError('User not found')
        }

        const deletedUser = await deleteUserFromDb(id)

        if(!deletedUser)
            throw new Error('Internal Server error: User deletion failed')

        const response: ApiResponse<User> = {
            success:true,
            data: deletedUser,
            message: "User deleted successfully"
        }
        res.status(200).json(response)
    }
    catch (err) {
        next(err)
    }
}