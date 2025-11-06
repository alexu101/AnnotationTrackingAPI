import {Router} from 'express'
import { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema, validate } from '../middlewares/schemaValidation.js'
import { createUser, getAllUsers, updateUser, getUserById } from '../controllers/user.controller.js'

const userRouter: Router = Router()

userRouter.get('/', getAllUsers)
userRouter.get('/:id',validate(getUserSchema), getUserById)
userRouter.post('/', validate(createUserSchema), createUser)
userRouter.put('/:id', validate(updateUserSchema), updateUser)
userRouter.delete('/:id', validate(deleteUserSchema), updateUser)

export default userRouter;