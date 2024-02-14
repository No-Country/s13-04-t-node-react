import { Router } from "express";
import userRoute from "./user.js"
import garageRoute from './garage.js'
import { carRoute } from "./car.js";
import reviewRoute  from './review.js';

const route=Router()


route.use("/users",userRoute)
route.use("/garage", garageRoute)
route.use("/cars",carRoute)
route.use("/review",reviewRoute)

export default route;