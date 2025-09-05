import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { handleError } from './shared/exception.js';
import 'dotenv/config'
import { usersRouter } from './users/user.routes.js';
import { authRouter } from './auth/auth.routes.js';
import { seedDate } from './shared/utils/initail-date.js';

const port = process.env.PORT
const jwt = process.env.JWT_SECRET


const app = express();
console.log(port)
console.log(jwt)

// cheak if content header ? handle stream and decode & deserilizable => req.body = {json} and under the hood make next()
app.use(express.json())

app.use(express.urlencoded())
seedDate()

app.use('/auth' , authRouter)
app.use('/users' , usersRouter)
// app.use('/courses' , coursesRouter)


app.use((err:unknown, req:Request, res:Response, next:NextFunction) => {
    handleError(err , res)
})

app.listen(port , () => {
    console.log(`server is runing on port ${port}`)
})