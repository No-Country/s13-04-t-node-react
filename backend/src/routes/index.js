import { Router } from "express";
import userRoute from "./user.js"
import garageRoute from './garage.js'

const route=Router()


route.use("/user",userRoute)
route.use("/garage", garageRoute)

export default route;