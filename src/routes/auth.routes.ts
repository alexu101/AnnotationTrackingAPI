import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/schema-validation/validateSchema.js";
import { createUserSchema, loginUserSchema } from "../middlewares/schema-validation/userValidation.js";

const authRouter = Router()

authRouter.post('/signup',validate(createUserSchema), signUp)
authRouter.post('/login', validate(loginUserSchema), login)

export default authRouter