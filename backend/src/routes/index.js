import { Router } from "express";
import userRoute from "./user.js"

const route=Router()



route.use("/user",userRoute)





export default route;