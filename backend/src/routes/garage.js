import { Router } from "express";
import {getAllGarages, getGarage, createGarage, updateGarage, deleteGarage } from '../controller/garage.js'
import {validateFields} from "../middleware/validatorGeneral.js"
import {validateCreateGarage,validateUpdateGarage,validateDeleteUser} from "../validators/garageValidator.js"
import { validateFiles } from "../validators/fileValidator.js";


const route=Router();

route.get("/",getAllGarages)
route.get("/:id",getGarage)
route.post("/", validateFiles, validateCreateGarage, validateFields, createGarage)
route.patch("/:id",validateUpdateGarage,validateFields,updateGarage)
route.delete("/:id",validateDeleteUser,validateFields,deleteGarage)


export default route;