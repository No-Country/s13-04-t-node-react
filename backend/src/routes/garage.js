import { Router } from "express";
import {getAllGarages, getGarage, createGarage, updateGarage, deleteGarage } from '../controller/garage.js'
import {validateFields} from "../middleware/validatorGeneral.js"
import {validateCreateGarage,validateUpdateGarage,validateDeleteUser} from "../validators/garageValidator.js"


const route=Router();

route.get("/",getAllGarages)
route.get("/:id",getGarage)
route.post("/",validateCreateGarage, validateFields,createGarage)
route.patch("/:id",validateUpdateGarage,validateFields,updateGarage)
route.delete("/:id",validateDeleteUser,validateFields,deleteGarage)


export default route;