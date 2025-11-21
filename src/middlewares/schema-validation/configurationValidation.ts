import z from "zod";

export const createConfigurationSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Configurtion name must be at least 3 characters").max(20, "Configuration name must be at most 20 characters"),
        roleId: z.uuid(),
        measurementUnit: z.string().min(1, "Enter measurement unit").max(10, "Measurement unit must be at most 10 characters")
    })
})

export const getConfigurationSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})


export const updateConfigurationSchema = z.object({
    params: z.object({
        id: z.uuid()
    }),
    body: z.object({
        name: z.string().min(3, "Configurtion name must be at least 3 characters").max(20, "Configuration name must be at most 20 characters").optional(),
        roleId: z.uuid().optional(),
        measurementUnit: z.string().min(1, "Enter measurement unit").max(10, "Measurement unit must be at most 10 characters").optional()
    })
})

export const deleteConfigurationSchema = z.object({
    params: z.object({
        id: z.uuid()
    })
})