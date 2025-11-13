import { Request, Response, NextFunction } from 'express'
import {z, ZodError} from 'zod'

export const validate = <T extends z.ZodType>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("mnu ", req.body)
            const parsed = schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            }) as any;

            console.log("mda: ", parsed.body)

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