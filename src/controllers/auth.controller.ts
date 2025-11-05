import { Request, Response } from "express"
import ApiResponse from "../types/express.types.js"
import bcrypt from 'bcrypt'
import {AuthInfo, TokenPayload} from "../types/auth.types.js"
import { generateToken, verifyPassword } from "../utils/utils.auth.js"
import { createUserInDb, getUserByEmailFromDb } from "../models/user.model.js"
import { getRoleByRoleNameFromDb } from "../models/role.models.js"

export const signUp = async (req: Request, res: Response) => {
    try {
        const {name, email, password, role, state, level, norm} = req.body

        const existingUser = await getUserByEmailFromDb(email)

        if(existingUser){
            const response: ApiResponse<any> = {
                success: false,
                message: `User with email ${email} already exists`
            }
            res.status(404).json(response)
            return
        }

        const userRole = await getRoleByRoleNameFromDb(role)

        if(!userRole){
            const response: ApiResponse<any> = {
                success: false,
                message: 'Invalid role'
            }
            res.status(404).json(response)
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUserInDb(name, email, state, level, norm, hashedPassword, userRole.id)

        if(!newUser) {
            const response: ApiResponse<any> = {
                success: false,
                message: 'User creation failed'
            }
            return res.status(500).json(response)
        }

        const tokenPayload: TokenPayload = {
            userId: newUser.id,
            roleId: newUser.roleId
        }

        const token = generateToken(tokenPayload)

        const response: ApiResponse<AuthInfo> = {
            success: true,
            data:{
                user: newUser,
                token: token
            },
            message: 'User successfully signed up'
        }
        res.status(201).json(response)

    } catch(error) {
        const response: ApiResponse<any> = {
            success: false,
            message: 'Internal server error'
        }
        res.status(500).json(response)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body

        const user =  await getUserByEmailFromDb(email, false)

        if (!user) {
            const response: ApiResponse<any> = {
                success: false,
                message: 'User not found'
            }
            res.status(404).json(response)
            return
        }

        const isPasswordValid = verifyPassword(password, user.password as string)

        if (!isPasswordValid) {
            const response: ApiResponse<any> = {
                success: false,
                message: 'Wrong password'
            }
            return
        }

        const tokenPayload: TokenPayload = {
            userId: user.id,
            roleId: user.roleId
        }

        const token = generateToken(tokenPayload)

        const response: ApiResponse<AuthInfo> = {
            success: true,
            data: {
                user,
                token
            },
            message: 'User logged in successfully'
        }
        res.status(200).json(response)
    } catch (error) {
        const response: ApiResponse<any> = {
            success: false,
            message: 'Internal server error'
        }
    }
}