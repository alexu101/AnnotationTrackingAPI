import { Router } from "express";
import { validate } from "../middlewares/schema-validation/validateSchema.js";
import { createConfigurationSchema, deleteConfigurationSchema, getConfigurationSchema, updateConfigurationSchema } from "../middlewares/schema-validation/configurationValidation.js";
import { createConfiguration, deleteConfiguration, getAllConfigurations, getConfigurationById, updateConfiguration } from "../controllers/configuration.controller.js";

export const configurationRouter = Router()

configurationRouter.get("/", getAllConfigurations)
configurationRouter.get("/:id",validate(getConfigurationSchema), getConfigurationById)
configurationRouter.post("/:id", validate(createConfigurationSchema), createConfiguration)
configurationRouter.put("/:id", validate(updateConfigurationSchema), updateConfiguration)
configurationRouter.delete("/:id", validate(deleteConfigurationSchema), deleteConfiguration)