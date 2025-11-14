import { Router } from "express";
import { validate } from "../middlewares/schema-validation/validateSchema.js";
import { createTaskSchema, deleteTaskSchema, getTaskSchema, updateTaskSchema } from "../middlewares/schema-validation/taskValidation.js";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller.js";

export const taskRouter = Router()

taskRouter.get('/:id', validate(getTaskSchema), getTaskById)
taskRouter.get('/', getAllTasks)
taskRouter.post('/', validate(createTaskSchema), createTask)
taskRouter.put('/', validate(updateTaskSchema), updateTask)
taskRouter.delete('/:id', validate(deleteTaskSchema), deleteTask)
