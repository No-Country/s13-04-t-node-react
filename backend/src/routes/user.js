import { Router } from "express";
import {getUser,getAllUser,updateUser,deleteUser} from "../controller/user.js"
import {validateFields} from "../middleware/validatorGeneral.js"
import {validateDeleteUser,validateUpdateUser} from "../validators/userValidator.js"

const route=Router()



route.get("/",getAllUser)
route.get("/:id",getUser)
route.put("/:id",validateUpdateUser,validateFields,updateUser)
route.delete("/:id",validateDeleteUser,validateFields,deleteUser)


export default route;
