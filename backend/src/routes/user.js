import { Router } from "express";
import {getUser,getAllUser,updateUser,deleteUser} from "../controller/user.js"
import {validateFields} from "../middleware/validatorGeneral.js"
import {validateUpdateUser} from "../validators/userValidator.js"
import {sessionAuth} from "../middleware/sessionAuth.js"
const route=Router()



route.get("/",sessionAuth,getAllUser)
route.get("/:id",getUser)
route.patch("/", sessionAuth,validateUpdateUser,validateFields,updateUser)
route.delete("/",sessionAuth,deleteUser)


export default route;
