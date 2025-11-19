import { Prisma } from "../generated/prisma/client.js"

export type RoleWithRelations = Prisma.RoleGetPayload<{
    include: {
        permissions: true
    }
}>