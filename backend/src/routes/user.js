import { Router } from "express";
import {getUser,getAllUser,createUser,updateUser,deleteUser} from "../controller/user.js"
import {validateFields} from "../middleware/validatorGeneral.js"
import {validateCreateUser,validateDeleteUser,validateUpdateUser} from "../validators/userValidator.js"
const route=Router()



route.get("/",getAllUser)
route.get("/:id",getUser)
route.post("/",validateCreateUser,validateFields,createUser)
route.put("/:id",validateUpdateUser,validateFields,updateUser)
route.delete("/:id",validateDeleteUser,validateFields,deleteUser)


export default route;
