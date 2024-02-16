import { check } from "express-validator";

const validateCreateUser = [
  check("name", "El nombre es obligatorio").isString().exists().not().isEmpty().trim(),

  check("email", "El correo no es válido").isString().exists().isEmail().trim(),

  check("password", "El password debe de ser más de 6 letras").isString().exists().isLength({ min:6 }).trim(),

  check("role", "Dirección no válida").optional().trim(),

  check("phone", "Número no válido").optional().isNumeric().isLength({ min:6 }),
];


const validateDeleteUser=[

  check('id', 'ID de usuario no válido').isUUID(),

]

const validateUpdateUser=[
  check('id','ID de usuario no valido').isUUID(),
  check("name", "El nombre es obligatorio").optional().isString().exists().not().isEmpty().trim(),

  check("email", "El correo no es válido").optional().isString().isEmpty().isEmail().trim(),

  check("role", "Dirección no válida").optional().isEmpty().trim(),

  check("phone", "Número no válido").optional().isEmpty().isNumeric().isLength({ min:6 }),

  check("rating").optional().isEmpty(),
  check("image").optional().isString().trim()
]
export { validateCreateUser , validateDeleteUser, validateUpdateUser };