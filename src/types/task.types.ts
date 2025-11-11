import Project from "./project.types.js"

export interface Task {
    id: string,
    project?: Project
    projectId: string
    createdAt: Date
    updatedAt: Date
}