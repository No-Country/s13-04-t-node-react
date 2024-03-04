import { Router } from "express";
import {pago , webhook} from "../controller/mercadoPago.js"
const route=Router()

/**
 * @openapi
 * tags:
 *   name: Payments
 *   description: Operaciones relacionadas con los pagos
*/

/**
 * @openapi
 * /api/pagos:
 *   post:
 *     summary: Crea una nueva orden
 *     description: Crea una nueva orden con los detalles proporcionados
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idCar:
 *                 type: string
 *                 format: uuid
 *                 description: ID del automóvil asociado a la reserva
 *                 required: true
 *               idGarage:
 *                 type: string
 *                 format: uuid
 *                 description: ID del garaje asociado a la reserva
 *                 required: true
 *               dateStart:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inicio de la reserva
 *                 required: true
 *               dateEnd:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de fin de la reserva
 *                 required: true
 *               price:
 *                 type: number
 *                 description: Precio de la orden
 *                 required: true
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 route:
 *                   type: string
 *                   description: Route to redirect
 *       400:
 *         description: Error en los datos de entrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/BadRequest'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.post("/",pago)

route.post("/webhook",webhook)


export default route