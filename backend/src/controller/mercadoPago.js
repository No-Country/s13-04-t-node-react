import { config } from "../config/config.js"
import {Car} from "../model/car.js"
import garage from "../model/garage.js"
import User from "../model/user.js";
import { BadRequest } from "../middleware/errors.js";
import axios from "axios"
import { Booking } from "../model/booking.js";
import { v4 as uuidv4 } from 'uuid';

const pago=async(req,res, next)=>{
  const { idCar, idGarage, dateStart, dateEnd, price } = req.body
   
    try {

      const car=await Car.findByPk(idCar,{include: [{ model: User , as: 'user' , attributes: {exclude: ['password','createdAt','updatedAt']}}]})
      const garages=await garage.findByPk(idGarage)
      const url = "https://api.mercadopago.com/checkout/preferences";
   
      if (!car && !garages) {
       throw new BadRequest("car or garage do not match")
      }

      const bookingId = uuidv4()

      const item=[{
        title: "Estacion-app",
        description: `Estacionamienro en ${garages.address} ` ,
        currency_id: "ARS",
        quantity: 1,
        unit_price: price,
      }];

        const data = {
          items: item,
          payer: {
            phone: { phone: garages.phone },
            identification: {},
            address:{
              "street_name": garages.address,
              "street_number": "",
              "zip_code": garages.zipcode
            },
            email: garages.email,
          },
          back_urls: {
            success: `https://estacionapp.vercel.app/efectivo-pago/${bookingId}`,
            pending: "https://estacionapp.vercel.app",
            failure: "https://estacionapp.vercel.app",
          },
          notification_url: "",
          metadata: { startDate: dateStart, endDate:dateEnd, idCar: idCar, idGarage: idGarage, bookingId: bookingId},
        };
  
        const result = await axios({
          method: "post",
          url: url,
          headers: { Authorization: `Bearer ${config.TOKEN_MP}` },
          data: data,
        });
        
        return res.status(201).json({route: result.data.init_point}); //ID de preferencia del formato
      } catch (error) {
        next(error)
      }
}

export const webhook = async(req, res, next) => {
  try{
    const { action, data } = req.body

    if(action === 'payment.created'){
      const payment = await axios({
        method: "get",
        url: `https://api.mercadopago.com/v1/payments/${data.id}`,
        headers: {
          Authorization: `Bearer ${config.TOKEN_MP}`
        }
      })

      const { start_date, end_date, id_car, id_garage, booking_id } = payment.data.metadata

      const { transaction_amount } = payment.data

      await Booking.create({
        id: booking_id,    
        id_car,
        id_garage,
        date_start: start_date,
        date_end: end_date,
        price: transaction_amount,
        status: 'active'})
    }

    res.status(200).json({message: "OK"})
  }catch(error){
    next(error)
  }
}

export {pago}