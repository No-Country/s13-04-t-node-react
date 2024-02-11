import { Router } from "express";
import { getAllCars, getCar, createCar, deleteCar, updateCar } from "../controller/car.js";
export const carRoute=Router()

carRoute.get("/",getAllCars)
carRoute.get("/:id",getCar)
carRoute.post("/",createCar)
carRoute.put("/:id",updateCar)
carRoute.delete("/:id",deleteCar)

