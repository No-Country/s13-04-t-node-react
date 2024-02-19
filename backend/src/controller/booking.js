import { Booking } from "../model/booking.js";
import { NotFound } from "../middleware/errors.js";
import { Car } from "../model/car.js";
import Garages from "../model/garage.js";

export const getAllBookings = async (req, res, next) => {
  try {
    const booking = await Booking.findAll();
    res.status(200).json({ booking: booking });
  } catch (error) {
    next(error);
  }
};
export const getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({
      where: {
        id,
      },
      attributes: ['id','date_start', 'date_end', 'status'],
      include: [
        {
          model: Car,
          as: 'car',
          attributes: {exclude: ['createdAt', 'updatedAt']},
        },
        {
          model: Garages,
          as: 'garage',
          attributes: {exclude: ['createdAt', 'updatedAt']},
        }
      ]
    });
    if (!booking) throw new NotFound("Booking not found");
    res.status(200).json({ booking: booking });
  } catch (error) {
    next(error);
  }
};

export const getBookingByCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Car.findByPk(id);
    if (!car) throw new NotFound("Car not found");

    const booking = await Booking.findAll({ where: { id_car: id }, include: [{ model: Car, as: 'car', attributes: {exclude: ['createdAt', 'updatedAt']} }]});

    res.status(200).json({ booking: booking });
  } catch (error) {
    next(error);
  }
};

export const getBookingByGarage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const garage = await Garages.findByPk(id);
    if (!garage) throw new NotFound("Garage not found");

    const booking = await Booking.findAll({ where: { id_garage: id }, include: [{
      model: Garages,
      as: 'garage',
      attributes: {exclude: ['createdAt', 'updatedAt']},
    }]});

    res.status(200).json({ booking: booking });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { idCar, idGarage, dateStart, dateEnd } = req.body;
    const newBooking = await Booking.create({
      id_car: idCar,
      id_garage: idGarage,
      date_start: dateStart,
      date_end: dateEnd,
    });
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findOne({
      where: { id },
    });
    if (!booking) throw new NotFound("Booking not found");
    booking.set(req.body);

    await booking.save();

    return res
      .status(200)
      .json({ message: "Booking updated", booking: booking });
  } catch (error) {
    next(error);
  }
};
export const deleteBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findOne({
      where: {
        id,
      },
    });
    if (!booking) throw new NotFound("Booking not found");

    await Booking.destroy({
      where: { id },
    });
    return res.status(200).send({ message: "Booking deleted" });
  } catch (error) {
    next(error);
  }
};
