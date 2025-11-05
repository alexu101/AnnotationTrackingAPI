import e, {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import ApiResponse from '../types/express.types.js'
import User from '../types/user.types.js'
import { createUserInDb, deleteUserFromDb, getAllUsersFromDb, getUserByEmailFromDb, getUserByIdFromDb, updateUserInDb } from '../models/user.model.js'
import { getRoleByRoleNameFromDb } from '../models/role.models.js'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersFromDb()

        const response: ApiResponse<User[]> ={
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        }
        res.status(200).json(response)

    } catch (err) {
        console.error(err)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email, state, level, password, norm, role} = req.body

        const existingUser = await getUserByEmailFromDb(email)
        if (existingUser){
            const response: ApiResponse<any> = {
                success: false,
                message: `User with email ${email} already exists`
            }
            res.status(409).json(response)
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userRole = await getRoleByRoleNameFromDb(role)

        if (!userRole){
            const response: ApiResponse<any> = {
                success: false,
                message: `Invalid role`
            }
            res.status(404).json(response)
            return
        }

        const newUser = await createUserInDb(name, email, state, level, norm, hashedPassword, userRole.id)

        if(!newUser) {
            const response: ApiResponse<any> = {
                success: false,
                message: 'User creation failed'
            }
            return res.status(500).json(response)
        }

        const response: ApiResponse<User> = {
            success: true,
            data: newUser,
            message: "User created successfully"
        }
        res.status(201).json(response)

    } catch(err){
        console.error(err)
        const response: ApiResponse<any> = {
            success: false,
            message: 'Internal server error'
        }
        res.status(500).json(response)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
        const id = req.params.id as string
            const updates = req.body

            const existingUser = await getUserByIdFromDb(id)

            if (!existingUser){
                const response: ApiResponse<any> = {
                    success: false,
                    message: `User not found`
                }
                res.status(404).json(response)
                return
            }

            const updatedUser = await updateUserInDb(id, updates)

            if(!updatedUser){
                const response: ApiResponse<any> = {
                    success: false,
                    message: `Internal server error`
                }
                res.status(500).json(response)
                return
            }

            const response: ApiResponse<User> = {
                success: true,
                data: updatedUser,
                message: 'User updated successfully'
            }
            res.status(200).json(response)

    } catch (error){
        console.error(error)
        const response: ApiResponse<any> = {
            success: false,
            message: 'Internal server error'
        }
        res.status(500).json(response)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const user = await getUserByIdFromDb(id)

        if(!user){
            const response: ApiResponse<any> = {
                success: false,
                message: `User not found`
            }
            res.status(404).json(response)
            return
        }

        const response: ApiResponse<User> = {
            success:true,
            data: user,
            message: "User retrieved successfully"
        }
        res.status(200).json(response)
    }
     catch (error){
        console.error(error)
        const response: ApiResponse<any> = {
            success: false,
            message: 'Internal server error'
        }
        res.status(500).json(response)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
        const id = req.params.id as string

        const user = await deleteUserFromDb(id)

        if(!user){
            const response: ApiResponse<any> = {
                success: false,
                message: `User not found`
            }
            res.status(404).json(response)
            return
        }

        const response: ApiResponse<User> = {
            success:true,
            data: user,
            message: "User deleted successfully"
        }
        res.status(200).json(response)
    }
    catch (error){
        console.error(error)
        const response: ApiResponse<any> = {
            success: false,
            message: 'Internal server error'
        }
        res.status(500).json(response)
    }
}