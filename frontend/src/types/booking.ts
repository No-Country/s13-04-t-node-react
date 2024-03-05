export interface  Booking {
  id: string
  date_start: string
  date_end: string
  status: string
  id_car: string
  id_garage: string
}
export interface CreateBooking {
    idCar: string,
    idGarage: string,
    dateStart: string,
    dateEnd: string,
    price: number
}