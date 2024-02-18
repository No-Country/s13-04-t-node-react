import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBooking,
  getBookingByCar,
  getBookingByGarage,
  updateBooking,
} from "../controller/booking.js";
import { validateFields } from "../middleware/validatorGeneral.js";
import { validateCreateBooking } from "../validators/bookingValidator.js";

const route = Router();

route.get("/", getAllBookings);
route.get("/:id", getBooking);
route.get("/car/:id", getBookingByCar);
route.get("/garage/:id", getBookingByGarage);
route.post("/", validateCreateBooking, validateFields, createBooking);
route.put("/:id", validateFields, updateBooking);
route.delete("/:id", validateFields, deleteBooking);

export default route;
