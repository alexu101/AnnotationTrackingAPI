import z from "zod";
import { validateS3URL } from "../../utils/utils.general.js";

export const createFileSchema = z.object({
    body: z.object({
        name: z.string().min(1, "File name is required").max(20, "File name must be at most 20 characters"),
        s3Location: z.url().refine(validateS3URL, {error: "S3 URL not valid"}),
    })
})

export const getFileSChema = z.object({
    params: z.object({
        id: z.uuid()
    })
})

export const updateFileSchema = z.object({
    params: z.object({
        id: z.uuid()
    }).optional(),
    body: z.object({
        name: z.string().min(1, "File name is required").max(20, "File name must be at most 20 characters"),
        s3Location: z.url().refine(validateS3URL, {error: "S3 URL not valid"}),
    }).optional()
})