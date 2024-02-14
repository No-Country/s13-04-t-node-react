import { Booking } from "../model/booking.js";

export const getAllBookings = async (req, res, next) => {
  try {
    const booking = await Booking.findAll();
    res.json(booking);
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
    });
    res.json(booking);
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
    res.json(newBooking);
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

    booking.set(req.body);

    await booking.save();

    res.json(booking);
  } catch (error) {
    next(error);
  }
};
export const deleteBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Booking.destroy({
      where: { id },
    });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
