import { check } from "express-validator";

const validateLogin = [
  check("email","El campo correo no puede esta vacio").exists(),
  check("password", "El password debe de ser más de 6 letras").isLength({ min:6 }),
]


export { validateLogin };