import { Router } from "express"
import { login,register } from "../controller/auth.js"
import { validateCreateUser } from "../validators/userValidator.js"
import { validateLogin } from "../validators/loginValidator.js"
import { validateFields } from "../middleware/validatorGeneral.js"

const route=Router()


route.post("/login",validateLogin,validateFields ,login)
route.post("/register",validateCreateUser,validateFields,register)


export default route