import express from 'express'
import { Express } from 'express'
import userRouter from './routes/user.routes.js'
import {port} from './config/config.env.js'

const app: Express = express()

app.use(express.json())
app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Task Management API listening on port ${port}`)
})