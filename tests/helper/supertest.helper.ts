import { app } from "../../src/server"
import request from "supertest"
import { signJWT } from "../../src/auth/utils/jwt.utils"


const token = signJWT({ sub:'1' , name: "admin123" })
export const unAuthorizedTestAgent = request.agent(app)
export const authorizedTestAgent = request.agent(app).set(
    'AUTHORIZATION' , `Bearer ${token}`
)   
