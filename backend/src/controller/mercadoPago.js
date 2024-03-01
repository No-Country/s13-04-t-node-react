import { config } from "../config/config.js"
import axios from "axios"
const pago=async(req,res)=>{

    // const {phone,item, shippingAddress, email, }=req.body
    //falta fecha inicio fecha fin id de garage id de auto
    //peticion para usuar
    let phone=123123211
    let shippingAddress={
      "street_name": "Nombre de la calle",
      "street_number": 123,
      "zip_code": "12345"
    }
    let email= "yannokaiser@hotmail.com"
    let name="Estacion-app"
    let description=`Estacionamienro en ` 
    let quantity=1
    let price=234
    const url = "https://api.mercadopago.com/checkout/preferences";
    try {

      const item=[{
        title: name,
        description: description,
        currency_id: "ARS",
        quantity: quantity,
        unit_price: price,
      }];

        const data = {
          items: item,
          payer: {
            phone: { phone: phone },
            identification: {},
            address: shippingAddress,//debe ser un objeto
            email: email,
          },
          back_urls: {
            success: "http://localhost:3000/operation",
            pending: "Su pago esta pendiente",
            failure: "El pago a fallado",
          },
          notification_url: "",
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