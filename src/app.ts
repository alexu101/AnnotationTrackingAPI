import 'dotenv/config'
import express from 'express'
import { Response, Request, Express } from 'express'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import userRouter from './routes/user.routes.js'

const app: Express = express()
const port: number = 3000

// app.use(myLogger)
// app.use(requestTime)
app.use(express.json())
app.use('/api/users', userRouter)
app.use(cookieParser())
app.use(cookieSession({
    name: 'Session',
    keys: ['install', 'skill'],
    maxAge: 1000 * 60 * 60 *24 //1 day
}))

app.get('/', (req: Request, res: Response) => {
    req.session = {
        name: 'alex',
        email: 'alex@email'
    }
    console.log(req.cookies, req.session)
    res.send('Hello World!')
})

app.post('/', (req: Request, res: Response) => {
    res.send('Got a post request')
})

app.listen(port, () => {
    console.log(`Task Management API listening on port ${port}`)
})