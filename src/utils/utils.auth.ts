import { jwtExpires, jwtSecret } from "../config/config.env.js"
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {TokenPayload} from '../types/auth.types.js'

export const generateToken = (data: TokenPayload): string => {
    const options ={
        expiresIn: jwtExpires as any
    }
    const jwtToken = jwt.sign(data, jwtSecret, options)
    return jwtToken
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}