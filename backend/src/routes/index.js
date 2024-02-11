import { Router } from "express";
import userRoute from "./user.js"
import { carRoute } from "./car.js";

const route=Router()

route.use("/users",userRoute)
route.use("/cars",carRoute)

export default route;