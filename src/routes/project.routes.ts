import { Router } from "express";

const projectRouter: Router = Router()

projectRouter.get("/", getAllProjects)
projectRouter.get("/:id", getProjectById)
projectRouter.post("/", createProject)
projectRouter.put("/:id", updateProject)
projectRouter.delete(":id/", deleteProject)

export default projectRouter