import express from 'express'
import { Express } from 'express'
import userRouter from './routes/user.routes.js'
import {port} from './config/config.env.js'
import authRouter from './routes/auth.routes.js'
import { errorHandler } from './middlewares/errorHandling.js'
import logger from './utils/logging.js'
import { connectToDB } from './config/config.db.js'
import projectRouter from './routes/project.routes.js'

const app: Express = express()

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/auth/', projectRouter)

app.use(errorHandler)

app.listen(port, () => {
    logger.info(`Task Management API listening on port ${port}`)
    connectToDB()
})