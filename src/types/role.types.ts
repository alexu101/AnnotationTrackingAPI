import { Permission } from "./permission.types.js"

export interface Role {
    id: string,
    name: string,
    permissions: Permission[]
    createdAt: Date,
    updatedAt: Date
}