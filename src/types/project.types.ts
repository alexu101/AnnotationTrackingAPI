import { Prisma } from "../generated/prisma/client.js"

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    tasks: true,
    users: true,
    configurations: true,
    files: true
  }
}>

export interface ProjectUpdatePayload {
  name?: string
  description?: string
  priority?: string
  state?: string
  autoFileAssignation?: boolean
  multipleFileAssignation?: boolean
}