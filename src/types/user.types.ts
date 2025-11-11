import Project from "./project.types.js"
import WorkDay from "./workday.project.js"

export default interface User {
    id: string
    name: string
    email: string
    roleId: string
    state: string
    norm: number
    level: string
    projects?: Project[]
    workDays?: WorkDay[]
    createdAt: Date
    updatedAt: Date
    password?: string
}