import { config } from "../config/config.js"
import {Car} from "../model/car.js"
import garage from "../model/garage.js"
import User from "../model/user.js";
import { AlreadyExist, NotFound,BadRequest } from "../middleware/errors.js";
import axios from "axios"
const pago=async(req,res)=>{
  const { idCar, idGarage, dateStart, dateEnd, price } = req.body
   
    try {

      const car=await Car.findByPk(idCar,{include: [{ model: User , as: 'user' , attributes: {exclude: ['password','createdAt','updatedAt']}}]})
      const garages=await garage.findByPk(idGarage)
      const url = "https://api.mercadopago.com/checkout/preferences";
   
      if (!car && !garages) {
       throw new BadRequest("car or garage do not match")
      }

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
            address: shippingAddress={
              "street_name": garages.address,
              "street_number": "",
              "zip_code": garages.zipcode
            },
            email: garages.email,
          },
          back_urls: {
            success: "http://localhost:3000/operation",
            pending: "Su pago esta pendiente",
            failure: "El pago a fallado",
          },
          notification_url: "",
          external_reference: { startDate:dateStart, endDate:dateEnd, car, garages},
        };
  
        const result = await axios({
          method: "post",
          url: url,
          headers: { Authorization: `Bearer ${config.TOKEN_MP}` },
          data: data,
        });
  
        console.log(result.data.init_point);
        // res.send(result.data.init_point); //ENLACE DE FORMATO DE PAGO
        return res.send(result.data.init_point); //ID de preferencia del formato
      } catch (error) {
        console.log(error);
      }
}

export {pago}