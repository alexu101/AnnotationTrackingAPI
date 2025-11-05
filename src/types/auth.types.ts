import User from "./user.types.js";

export interface AuthInfo {
    user: User
    token: string
}

export interface TokenPayload {
    userId: string
    roleId: string
}