import { NextFunction, Request, Response } from "express"
import ApiResponse from "../types/express.types.js"
import bcrypt from 'bcrypt'
import {AuthInfo, TokenPayload} from "../types/auth.types.js"
import { generateToken, verifyPassword } from "../utils/utils.auth.js"
import { createUserInDb, getUserByEmailFromDb } from "../models/user.model.js"
import { getRoleByRoleNameFromDb } from "../models/role.models.js"
import { ResourceConflictError } from "../errors/ResourceConflictError.js"
import { NotFoundError } from "../errors/NotFoundError.js"
import { BadRequestError } from "../errors/BadRequestError.js"

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password, role, state, level, norm} = req.body

        const existingUser = await getUserByEmailFromDb(email)

        if(existingUser){
            throw new ResourceConflictError(`User with email ${email} already exists`)
        }

        const userRole = await getRoleByRoleNameFromDb(role)

        if(!userRole){
            throw new NotFoundError('Invalid role')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await createUserInDb(name, email, state, level, norm, hashedPassword, userRole.id)

        if(!newUser) {
            throw new Error('Internal server error: User creation failed')
        }

        const tokenPayload: TokenPayload = {
            userId: newUser.id
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

    } catch(err) {
        next(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body

        const user =  await getUserByEmailFromDb(email, false)

        if (!user) {
            throw new NotFoundError('User with provided credentials not found')
        }

        const isPasswordValid = await verifyPassword(password, user.password as string)

        if (!isPasswordValid) {
            return new BadRequestError('Invalid password')
        }

        const tokenPayload: TokenPayload = {
            userId: user.id
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
    } catch (err) {
        next(err)
    }
}