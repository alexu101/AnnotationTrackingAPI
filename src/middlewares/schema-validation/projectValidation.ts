import z from "zod";

export const getProjectSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})

export const createProjectSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Project name is required"),
        description: z.string().min(10, "Project minimum length is 10 characters").max(300, "Project maximum length is 30 characters"),
        priority: z.enum(["low", "medium", "high", "highest"], 'Priority must be one of the following: ["low", "medium", "high", "highest"]'),
        state: z.enum(["to do", "in progress", "done"], 'State must be one of the following: ["to do", "in progress", "done"]'),
        autoFileAssignation: z.boolean().default(false),
        multipleFileAssignation: z.boolean().default(false)
    })
})

export const updateProjectSchema = z.object({
    params: z.object({
        id: z.uuid()
    }),
    body: z.object({
        name: z.string().min(1, "Project name is required").optional(),
        description: z.string().min(10, "Project minimum length is 10 characters").max(300, "Project maximum length is 30 characters").optional(),
        priority: z.enum(["low", "medium", "high", "highest"], 'Priority must be one of the following: ["low", "medium", "high", "highest"]').optional(),
        state: z.enum(["to do", "in progress", "done"], 'State must be one of the following: ["to do", "in progress", "done"]').optional(),
        autoFileAssignation: z.boolean().optional(),
        multipleFileAssignation: z.boolean().optional()
    })
})

export const deleteProjectSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})