import {Request, Response} from 'express'
import prisma from "../db/getDb.js"
import bcrypt from 'bcrypt'
import ApiResponse from '../types/express.types.js'
import User from '../types/user.types.js'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include:{
                projects: true,
                workDays: true
            }
        })

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

        const existingUser = await prisma.user.findUnique({where:{
            email: email
        }})
        if (existingUser){
            const response: ApiResponse<any> = {
                success: false,
                message: `User with email ${email} already exists`
            }
            res.status(409).json(response)
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userRole = await prisma.role.findUnique({where:{
            name: role
        }})

        if (!userRole){
            const response: ApiResponse<any> = {
                success: false,
                data: null,
                message: `Invalid role`
            }
            res.status(404).json(response)
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                state,
                level,
                norm,
                password: hashedPassword,
                roleId: userRole!.id
            },
            omit: {
                password: true
            },
            include:{
                projects: true,
                workDays: true
            }
        })

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

            const existingUser = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            if (!existingUser){
                const response: ApiResponse<any> = {
                    success: false,
                    message: `User not found`
                }
                res.status(404).json(response)
                return
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id
                },
                data: updates,
                omit: {
                    password: true
                },
                include:{
                    workDays: true,
                    projects: true
                }
            })

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

        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                projects: true,
                workDays: true
            }
        })

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

        const user = await prisma.user.delete({
            where: {
                id
            },
            include: {
                projects: true,
                workDays: true
            }
        })

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