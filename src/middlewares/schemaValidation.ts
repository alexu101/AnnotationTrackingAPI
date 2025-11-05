import { Request, Response, NextFunction } from 'express'
import {z, ZodError} from 'zod'

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(6, 'Name must be at least 6 characters'),
        email: z.email('Invalid email format'),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be at most 20 characters")
            .refine(pwd => /.*[A-Z].*/.test(pwd), "Password must contain at least one uppercase character")
            .refine(pwd => /.*[^A-Za-z0-9].*/.test(pwd), "Password must contain at least one special character")
            .refine(pwd => /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]+$/.test(pwd), "Password contains invalid characters"),
        passwordRetype: z.string(),
        role: z.enum(["annotator", "reviewer", "tech-support", "supervisor"], "Role must be one of the following: ['annotator', 'reviewer', 'tech-support', 'supervisor']"),
        state: z.enum(["active", "inactive"], "State must be one of the following: ['active', 'inactive']").default("active"),
        level: z.enum(["beginner", "intermmediate", "advanced"], "Level must be one of the following: ['beginner', 'intermmediate', 'advanced']"),
        norm: z.number().refine(norm => [4, 6, 8].includes(norm), "Norm must be one of the following: [4, 6, 8]"),
        projects: z.uuid().array().optional(),
        workDays: z.uuid().array().optional()
    }).refine(data => data.password === data.passwordRetype, {
        message: "Passwords don't match",
        path: ["passwordRetype"]
    })
})

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().min(6, 'Name must be at least 6 characters').optional(),
        role: z.enum(["annotator", "reviewer", "tech-support", "supervisor"], "Role must be one of the following: ['annotator', 'reviewer', 'tech-support', 'supervisor']").optional(),
        state: z.enum(["active", "inactive"], "State must be one of the following: ['active', 'inactive']").default("active").optional(),
        level: z.enum(["beginner", "intermediate", "advanced"], "Level must be one of the following: ['beginner', 'intermmediate', 'advanced']").optional(),
        norm: z.number().refine(norm => [4, 6, 8].includes(norm), "Norm must be one of the following: [4, 6, 8]").optional()
    }),
    params: z.object({
        id: z.uuid()
    })
})

export const getUserSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})

export const deleteUserSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})

export const loginUserSchema = z.object({
    body: z.object({
        email: z.email('Invalid email format'),
        password: z.string().min(1, "Password is required")
    })
})

export const validate = <T extends z.ZodType>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            const parsed = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            }) as any;

            if (parsed.body) req.body = parsed.body
            if (parsed.query) req.query = parsed.query
            if (parsed.params) req.params = parsed.params

            next()
        } catch (error) {
            if (error instanceof ZodError){
                res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: error.issues.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                })
            }
        }
    }
}