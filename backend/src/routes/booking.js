import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBooking,
  getBookingByCar,
  getBookingByGarage,
  updateBooking,
} from "../controller/booking.js";
import { validateFields } from "../middleware/validatorGeneral.js";
import { validateCreateBooking , validateUpdateBooking } from "../validators/bookingValidator.js";

const route = Router();

/**
 * @openapi
 * tags:
 *   name: Booking
 *   description: Operaciones relacionadas con las reservas
*/

/**
 * @openapi
 * /api/bookings:
 *   get:
 *     summary: Obtiene todas las reservas
 *     description: Retorna una lista de todas las reservas
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Reservas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.get("/", getAllBookings);

/**
 * @openapi
 * /api/bookings/{id}:
 *   get:
 *     summary: Obtiene una reserva por su ID
 *     description: Retorna una reserva basada en su ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reserva obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/NotFound'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.get("/:id", getBooking);

/**
 * @openapi
 * /api/bookings/car/{id}:
 *   get:
 *     summary: Obtiene todas las reservas asociadas a un automóvil
 *     description: Retorna una lista de todas las reservas asociadas a un automóvil específico
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del automóvil
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reservas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Automóvil no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/NotFound'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.get("/car/:id", getBookingByCar);

/**
 * @openapi
 * /api/bookings/garage/{id}:
 *   get:
 *     summary: Obtiene todas las reservas asociadas a un Garage
 *     description: Retorna una lista de todas las reservas asociadas a un Garage específico
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Garage
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reservas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Garage no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/NotFound'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.get("/garage/:id", getBookingByGarage);

/**
 * @openapi
 * /api/bookings:
 *   post:
 *     summary: Crea una nueva reserva
 *     description: Crea una nueva reserva con los detalles proporcionados
 *     tags: [Booking]
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
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
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
route.post("/", validateCreateBooking, validateFields, createBooking);

/**
 * @openapi
 * /api/bookings/{id}:
 *   put:
 *     summary: Actualiza una reserva existente
 *     description: Actualiza una reserva existente con los detalles proporcionados
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva a actualizar
 *         schema:
 *           type: string
 *           format: uuid
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
 *               idGarage:
 *                 type: string
 *                 format: uuid
 *                 description: ID del garaje asociado a la reserva
 *               dateStart:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de inicio de la reserva
 *               dateEnd:
 *                 type: string
 *                 format: date-time
 *                 description: Nueva fecha de fin de la reserva
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 booking:
 *                   $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/NotFound'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.put("/:id", validateUpdateBooking ,validateFields, updateBooking);

/**
 * @openapi
 * /api/bookings/{id}:
 *   delete:
 *     summary: Elimina una reserva existente
 *     description: Elimina una reserva existente según su ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reserva a eliminar
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/NotFound'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.delete("/:id", validateFields, deleteBooking);

export default route;
