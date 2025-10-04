import express, { response } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { handleError } from './shared/exception';
import 'dotenv/config'
import { usersRouter } from './users/user.routes';
import { authRouter } from './auth/auth.routes';
import { seedDate } from './shared/utils/initail-date';
import { courseRouter } from './courses/course.routes';
import { responseEnhancer } from './shared/middleware/response.middleware';

const port = process.env.PORT

export const app = express();

// cheak if content header ? handle stream and decode & deserilizable => req.body = {json} and under the hood make next()
app.use(express.json())

app.use(express.urlencoded())
seedDate()
app.use(responseEnhancer)
app.use('/auth' , authRouter)
app.use('/users' , usersRouter)
app.use('/courses' , courseRouter)


app.use((err:unknown, req:Request, res:Response, next:NextFunction) => {
    handleError(err , res)
})
console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV !== 'test') {
  app.listen(port , () => {
     console.log(`server is runing on port ${port}`)
 })
}
