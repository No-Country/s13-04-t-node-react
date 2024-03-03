import { check } from "express-validator";

export const validateCreateBooking = [
  check("idCar", "idCar is required").isUUID().exists().trim(),
  check("idGarage", "idGarage is required").isUUID().exists().trim(),
  check("dateStart", "dateStart is required").isString().exists().trim(),
  check("dateEnd", "dateEnd is required").isString().exists().trim(),
  check("price" , "Price is required").isNumeric().exists().trim(),
];

export const validateUpdateBooking = [
  check("idCar", "idCar is required").isUUID().optional(),
  check("idGarage", "idGarage is required").isUUID().optional(),
  check("dateStart", "dateStart is required").isString().optional(),
  check("dateEnd", "dateEnd is required").isString().optional(),
  check("price" , "Price is required").isNumeric().optional(),
]