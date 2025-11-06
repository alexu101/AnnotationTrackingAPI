import express from 'express'
import { Express } from 'express'
import userRouter from './routes/user.routes.js'
import {port} from './config/config.env.js'
import authRouter from './routes/auth.routes.js'

const app: Express = express()

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)

const asyncOp = () =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
        throw new Error("Oops")
    }, 3000)
    })
}
app.get('/test', async (req, res) => {
  const data = await asyncOp()
  res.json({ message: data }); // Will this ever run?
});

app.listen(port, () => {
    console.log(`Task Management API listening on port ${port}`)
})