import { Router } from "express";
import {getAllGarages, getGarage, createGarage, updateGarage, deleteGarage } from '../controller/garage.js'

const route=Router();

route.get("/",getAllGarages)
route.get("/:id",getGarage)
route.post("/",createGarage)
route.patch("/:id",updateGarage)
route.delete("/:id",deleteGarage)


export default route;