import Project from "./project.types.js"

export interface Configuration{
    id: string,
    projects?: Project[]
    createdAt: Date,
    updatedAt: Date
}