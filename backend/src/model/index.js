import User from "./user.js";
import { Car } from "./car.js";
import Garages from "./garage.js";
import { Booking } from "./booking.js";
import { Image } from "./image.js";

await User.sync();
await Car.sync();
await Image.sync()
await Garages.sync({alter: true});
await Booking.sync();
