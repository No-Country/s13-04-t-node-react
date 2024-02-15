import User from "./user.js";
import { Car } from "./car.js";
import Garages from "./garage.js";
import { Booking } from "./booking.js";
import {Review} from "./review.js"

await User.sync();
await Car.sync();
await Garages.sync();
await Booking.sync();
await Review.sync();