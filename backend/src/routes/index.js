import { Router } from "express";
import userRoute from "./user.js";
import garageRoute from "./garage.js";
import { carRoute } from "./car.js";
import bookingRoute from "./booking.js";
import routeAuth from "./auth.js"
import reviewRoute  from './review.js';

const route = Router();

route.use("/auth", routeAuth)
route.use("/users", userRoute);
route.use("/garages", garageRoute);
route.use("/cars", carRoute);
route.use("/bookings", bookingRoute);
route.use("/review",reviewRoute)

export default route;
