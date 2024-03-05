import Garages from "../model/garage.js"
import { Conflict, NotFound } from "./errors.js"
import { Booking } from "../model/booking.js"
import { Op, fn, col } from "sequelize"

export const checkCapacity = async (req, res, next) => {
    try {
        const { idGarage, dateStart, dateEnd } = req.body

        const garage = await Garages.findByPk(idGarage)

        if(!garage){
            throw new NotFound("Garage not found")
        }

        const bookingsCount = await Booking.findOne({
            attributes: ["id_garage", [fn("COUNT", col("*")), "totalBookings"]],
            where: {
              id_garage: idGarage,
              date_start: { [Op.between]: [dateStart, dateEnd] },
              date_end: { [Op.between]: [dateStart, dateEnd] },
            },
            group: ["id_garage"],
        });

        if(bookingsCount && bookingsCount.dataValues.totalBookings >= garage.capacity){
            throw new Conflict("Garage is full")
        }

        next()
    } catch (error) {
        next(error)
    }
}