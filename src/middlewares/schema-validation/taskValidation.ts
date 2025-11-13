import z from "zod";

export const createTaskSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Project name must be at least 2 characters long").max(20,"Project name must be at most 20 characters long"),
        priority: z.enum(["low", "medium", "high", "highest"], 'Priority must be one of the following: ["low", "medium", "high", "highest"]'),
        state: z.enum(["to do", "in progress", "done"], 'State must be one of the following: ["to do", "in progress", "done"]'),
        startDate: z.date().default(new Date()),
        endDate: z.date().default(new Date()),
        projectId: z.uuid()
    })
}).refine(data => data.body.startDate > data.body.endDate, {
    error: "Start date cannot be after end date",
    path: ["startDate", "endDate"]
})

export const getTaskSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})

export const updateTaskSchema = z.object({
    params: z.object({
        id: z.uuid()
    }),
    body: z.object({
        name: z.string().min(2, "Project name must be at least 2 characters long").max(20,"Project name must be at most 20 characters long").optional(),
        priority: z.enum(["low", "medium", "high", "highest"], 'Priority must be one of the following: ["low", "medium", "high", "highest"]').optional(),
        state: z.enum(["to do", "in progress", "done"], 'State must be one of the following: ["to do", "in progress", "done"]').optional(),
        startDate: z.date().default(new Date()).optional(),
        endDate: z.date().default(new Date()).optional()
    })
})

export const deleteTaskSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})