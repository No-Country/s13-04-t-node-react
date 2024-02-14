import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBooking,
  updateBooking,
} from "../controller/booking.js";

const route = Router();

route.get("/", getAllBookings);
route.get("/:id", getBooking);
route.post("/", createBooking);
route.put("/:id", updateBooking);
route.delete("/:id", deleteBooking);

export default route;
