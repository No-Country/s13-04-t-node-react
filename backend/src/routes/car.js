import { Router } from "express";
import { getAllCars, getCar, createCar, deleteCar, updateCar, getCarByUser } from "../controller/car.js";
import {validateFields} from "../middleware/validatorGeneral.js"
import { validateCreateCar, validateUpdateCar, validateID } from "../validators/carValidator.js";
export const carRoute=Router()

carRoute.get("/",getAllCars)
carRoute.get("/:id",validateID,validateFields, getCar)
carRoute.get("/user/:id",validateID,validateFields,getCarByUser)
carRoute.post("/",validateCreateCar,validateFields,createCar)
carRoute.put("/:id",validateUpdateCar,validateFields,updateCar)
carRoute.delete("/:id",validateID,validateFields,deleteCar)

