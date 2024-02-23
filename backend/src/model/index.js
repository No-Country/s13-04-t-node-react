import User from "./user.js";
import { Car } from "./car.js";
import Garages from "./garage.js";
import { Booking } from "./booking.js";
import { Image } from "./image.js";
import {Review} from "./review.js"


await Garages.sync();
await User.sync();
await Car.sync();
await Image.sync()
await Booking.sync();
await Review.sync();
