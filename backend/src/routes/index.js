import { Router } from "express";
import userRoute from "./user.js";
import garageRoute from "./garage.js";
import { carRoute } from "./car.js";
import bookingRoute from "./booking.js";

const route = Router();

route.use("/users", userRoute);
route.use("/garages", garageRoute);
route.use("/cars", carRoute);
route.use("/bookings", bookingRoute);

export default route;
