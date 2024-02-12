import User from "./user.js";
import { Car } from "./car.js";
import Garages from "./garage.js";

await User.sync()
await Car.sync()
await Garages.sync()