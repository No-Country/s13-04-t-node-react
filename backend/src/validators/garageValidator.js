import { check } from "express-validator";

export const validateID=[
    check('id', 'Invalid ID').isUUID(),
]

export const validateCreateGarage = [
    check("idUser", "idUser is required").isUUID().exists().trim(),
    check("name", "Name is required").isString().exists().trim(),
    check("address", "Adress is required").isString().exists().trim(),
    check("country", "Country is required").isString().exists().trim(),
    check("province", "Province is required").isString().exists().trim(),
    check("city", "City is required").isString().exists().trim(),
    check("zipCode", "Zip Code is required").isString().exists().trim(),
    check("coordinates", "Coordinates is required").isString().exists().trim(),
    check("capacity", "Capacity is required").isNumeric().exists().trim(),
    check("price", "Price is required").isNumeric().exists().trim(),
    check("whitConfirmation" , "With confirmation is required").optional().isBoolean().trim(),
    check('schedule' , "Schedile is required").isJSON().exists().trim()
];

export const validateUpdateGarage=[
    check('id','Garage ID is not valid').isUUID(),
    check("idUser", "idUser is required").isUUID().optional(),
    check("name", "Name is required").optional().isString().trim(),
    check("address", "Adress is required").optional().isString().trim(),
    check("country", "Country is required").optional().isString().trim(),
    check("province", "Province is required").optional().isString().trim(),
    check("city", "City is required").optional().isString().trim(),
    check("zipCode", "Zip Code is required").optional().isString().trim(),
    check("coordinates", "Coordinates is required").optional().isString().trim(),
    check("image").optional().isString().trim(),

  ]


export const validateDeleteUser=[

    check('id', 'ID de garage no válido').isUUID(),
  
  ]