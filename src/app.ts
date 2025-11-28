import express, { NextFunction } from 'express'
import { Express } from 'express'
import userRouter from './routes/user.routes.js'
import {port} from './config/config.env.js'
import authRouter from './routes/auth.routes.js'
import { errorHandler } from './middlewares/errorHandling.js'
import logger from './utils/utils.logging.js'
import { connectToDB } from './config/config.db.js'
import projectRouter from './routes/project.routes.js'
import { taskRouter } from './routes/task.routes.js'
import { fileRouter } from './routes/file.routes.js'
import { configurationRouter } from './routes/configuration.routes.js'

const app: Express = express()

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/projects', projectRouter)
app.use('/api/tasks',taskRouter)
app.use('/api/files', fileRouter)
app.use('/api/configurations', configurationRouter)

app.use(errorHandler)

app.post("/api/start-hash", async (req, res, next:NextFunction) => {
    try {
        const data = await fetch("http://localhost:8000/api/hash", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({file_path: "C:\\Alex Tanase\\Projects\\MarkAiTestData\\DAT\\dat_input.dat", notification_endpoint: "http://localhost:3000/api/webhook/hash-result"})})

        const response = await data.json()
        res.status(200).json(response)
    } catch(err) {
        console.log(err)
    }


})

app.post("/api/webhook/hash-result", (req, res, next:NextFunction) => {
    console.log(req.body)
    res.status(200).json({success: true})
})

app.listen(port, () => {
    logger.info(`Task Management API listening on port ${port}`)
    connectToDB()
})