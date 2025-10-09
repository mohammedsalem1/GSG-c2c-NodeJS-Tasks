import mongoose from "mongoose"
import { getEnvOrThrow } from "../config/app.config"

mongoose.connect(getEnvOrThrow('MONGODB_URL'))
    .then(() => console.log('Mongodb connected'))
    .catch(() => console.log('Mongodb connection error'))
