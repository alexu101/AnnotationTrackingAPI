import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";
import { createUserSchema, loginUserSchema, validate } from "../middlewares/schemaValidation.js";

const authRouter = Router()

authRouter.post('/signup',validate(createUserSchema), signUp)
authRouter.post('/login', validate(loginUserSchema), login)

export default authRouter