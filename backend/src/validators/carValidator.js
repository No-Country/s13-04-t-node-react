import { check } from "express-validator";

export const validateGetCar=[
    check('id', 'Invalid ID').isUUID(),
]

export const validateCreateCar = [
  check("idUser", "idUser is required").isUUID().exists().trim(),
  check("brand", "Brand is required").isString().exists().trim(),
  check("model", "Model is required").isString().exists().trim(),
  check("plate", "Plate is required").isString().exists().trim(),
  check("color", "Color is required").isString().exists().trim(),
];

export const validateDeleteCar=[
  check('id', 'Invalid ID').isUUID(),
]

export const validateUpdateCar=[
  check('id','Car ID is not valid').isUUID(),
  check("idUser", "idUser is required").isUUID().optional(),
  check("brand", "Brand is required").optional().isString().trim(),
  check("model", "Model is required").optional().isString().trim(),
  check("plate", "Plate is required").optional().isString().trim(),
  check("color", "Color is required").optional().isString().trim(),
]