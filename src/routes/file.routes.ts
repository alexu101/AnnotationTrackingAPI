import { Router } from "express";
import { createFile, deleteFile, getAllFiles, updateFile } from "../controllers/file.controller.js";
import { validate } from "../middlewares/schema-validation/validateSchema.js";
import { createFileSchema, deleteFileSchema, getFileSchema, updateFileSchema } from "../middlewares/schema-validation/fileValidation.js";

export const fileRouter = Router()

fileRouter.post("/", validate(createFileSchema), createFile)
fileRouter.get("/", getAllFiles)
fileRouter.get("/:id", validate(getFileSchema))
fileRouter.put("/:id", validate(updateFileSchema) ,updateFile)
fileRouter.delete("/:id", validate(deleteFileSchema), deleteFile)