import {Request, Response} from 'express'
import prisma from "../db/getDb.js"
import bcrypt from 'bcrypt'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        })
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
            res.status(409).json({
                success: false,
                data: null,
                message: `User with email ${email} already exists`
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userRole = await prisma.role.findUnique({where:{
            name: role
        }})

        if (!userRole){
            res.status(404).json({
                success: false,
                data: null,
                message: `Invalid role`
            })
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
            }
        })

        res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully"
        })

    } catch(err){
        console.error(err)
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error'
        })
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
                res.status(404).json({
                    success: false,
                    data: null,
                    message: `User not found`
                })
                return
            }

            const updatedUser = await prisma.user.update({
                where: {
                    id
                },
                data: updates,
                omit: {
                    password: true
                }
            })

            res.status(200).json({
                success: true,
                data: updatedUser,
                message: 'User updated successfully'
            })

    } catch (error){
        console.error(error)
        res.status(500).json({
            success: false,
            data: null,
            message: 'Internal server error'
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as string

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if(!user){
        res.status(404).json({
            success:false,
            data:null,
            message: "User not found"
        })
    }

    res.status(200).json({
        success:true,
        data: null,
        message: "User retrieved successfully"
    })
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id as string

    const user = await prisma.user.delete({
        where: {
            id
        }
    })

    if(!user){
        res.status(404).json({
            success:false,
            data:null,
            message: "User not found"
        })
    }

    res.status(200).json({
        success:true,
        data: null,
        message: "User deleted successfully"
    })
}