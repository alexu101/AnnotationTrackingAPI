import { Configuration } from "./configuration.type.js"
import { Task } from "./task.types.js"
import { File } from "./file.types.js"
import User from "./user.types.js"

export default interface Project {
  id: string
  name: string
  description: string
  priority: string
  state: string
  configurations: Configuration[]
  tasks: Task[]
  files: File[]
  users: User[]
  autoFileAssignation: boolean
  multipleFileAssignation: boolean
  createdAt: Date
  updatedAt: Date
}