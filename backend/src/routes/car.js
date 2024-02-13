import { Router } from "express";
import { getAllCars, getCar, createCar, deleteCar, updateCar } from "../controller/car.js";
import {validateFields} from "../middleware/validatorGeneral.js"
import { validateGetCar,validateCreateCar, validateUpdateCar, validateDeleteCar } from "../validators/carValidator.js";
export const carRoute=Router()

carRoute.get("/",getAllCars)
carRoute.get("/:id",validateGetCar,validateFields, getCar)
carRoute.post("/",validateCreateCar,validateFields,createCar)
carRoute.put("/:id",validateUpdateCar,validateFields,updateCar)
carRoute.delete("/:id",validateDeleteCar,validateFields,deleteCar)

