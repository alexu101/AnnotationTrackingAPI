import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getProjectById, getProjectConfigurations, updateProject } from "../controllers/project.controller.js";
import { validate } from "../middlewares/schema-validation/validateSchema.js";
import { createProjectSchema, deleteProjectSchema, getProjectSchema, updateProjectSchema } from "../middlewares/schema-validation/projectValidation.js";

const projectRouter: Router = Router()

projectRouter.get("/", getAllProjects)
projectRouter.get("/:id", validate(getProjectSchema), getProjectById)
projectRouter.get("/:id/configurations", validate(getProjectSchema), getProjectConfigurations)
projectRouter.post("/", validate(createProjectSchema), createProject)
projectRouter.put("/:id", validate(updateProjectSchema), updateProject)
projectRouter.delete(":id/", validate(deleteProjectSchema), deleteProject)

export default projectRouter