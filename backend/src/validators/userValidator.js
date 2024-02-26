import { check } from "express-validator";

const validateCreateUser = [
  check("name", "El nombre es obligatorio").isString().exists().not().isEmpty().trim(),

  check("email", "El correo no es válido").isString().exists().isEmail().trim(),

  check("password", "El password debe de ser más de 6 letras").isString().exists().isLength({ min:6 }).trim(),

  check("identity", "La identidad no es válida").isString().exists().trim(),

  check("role", "Dirección no válida").optional().trim(),

  check("phone", "Número no válido").optional().trim(),
];



const validateUpdateUser=[
  check("name", "El nombre es obligatorio").optional().isString().exists().trim(),
  check("email", "El correo no es válido").optional().isString().isEmail().trim(),
  check("phone", "Número no válido").optional().trim(),
  check("rating").optional().isNumeric(),
  check("image").optional().isString().trim()
]
export { validateCreateUser , validateUpdateUser };