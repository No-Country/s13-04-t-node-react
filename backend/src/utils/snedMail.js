import * as nodemailer from 'nodemailer';
import {config} from "../config/config.js"

const sendMail = (user, template) => {
    
    let templates = [
      {
        id: "Bienvenida",
        subject: "Bienvenido a Estacion-App",
        text: "Bienvenido a Estacion-App",
        html: `<h1>Bienvenido ${user?.name} estamos felizes de que estes con nosotros</h1>`,
      },
      {
        id: "confirmation",
        subject: "Confirmacion de reserva estacion-app",
        text: "Confirmacion de reserva estacion-app",
        html: `<h1>Hola ${user?.name} ingresa en el link para poder confirma tuu reserva de estacionamiento</h1>
        <h2> ${process.env.URL_FRONT}/</h2>
        `,
      }
     
    ];
  
    let datos = templates.filter((dato) => dato.id === template);
  
  
    if (datos.length == 0) {
      return console.log("No se ha seleccionado ningun template");
    }
    
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com", //Servidor del email.
      port: 587,//puertos: 25, 465 o 587.
      secure: false,
      auth: {
        user: config.USER,
        pass: config.PASS,
      },
    });

 
    if (!user) {
        return console.log("Usuario no definido");
      }
    
    
    let mailOptions = {
      form: "remitente",
      to: user.email,
      subject: datos[0].subject,
      html: datos[0].html,
    };
  
    transport.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error.message);
        
        
      } else {
        console.log("email enviado");
      }
    });
  };
  
  export { sendMail };