import { check } from "express-validator";

export const validateCreateBooking = [
  check("idCar", "idCar is required").isUUID().exists().trim(),
  check("idGarage", "idGarage is required").isUUID().exists().trim(),
  check("dateStart", "dateStart is required").isString().exists().trim(),
  check("dateEnd", "dateEnd is required").isString().exists().trim(),
];
