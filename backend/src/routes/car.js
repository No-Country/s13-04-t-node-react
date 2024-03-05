import { Router } from "express";
import { getAllCars, getCar, createCar, deleteCar, updateCar, getCarByUser } from "../controller/car.js";
import {validateFields} from "../middleware/validatorGeneral.js"
import { validateCreateCar, validateUpdateCar, validateID } from "../validators/carValidator.js";
export const carRoute=Router()

/**
 * @openapi
 * tags:
 *   name: Car
 *   description: Operaciones relacionadas con los coches
*/

/**
 * @openapi
 * /api/cars:
 *   get:
 *     summary: Obtiene todos los coches
 *     description: Retorna una lista de coches
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: Coches obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
 */
carRoute.get("/",getAllCars)

/**
 * @openapi
 * /api/cars/{id}:
 *   get:
 *     summary: Obtiene un coche por su ID
 *     description: Retorna un coche basado en su ID
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del coche a obtener
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Coche obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Coche no encontrado
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
carRoute.get("/:id",validateID,validateFields, getCar)

/**
 * @openapi
 * /api/cars/user/{id}:
 *   get:
 *     summary: Obtiene todos los coches de un usuario por su ID
 *     description: Retorna una lista de coches asociados a un usuario basado en su ID
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario cuyos coches se desean obtener
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Coches obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cars:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Car'
 *       404:
 *         description: Usuario no encontrado
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
carRoute.get("/user/:id",validateID,validateFields,getCarByUser)

/**
 * @openapi
 * /api/cars:
 *   post:
 *     summary: Crea un nuevo coche
 *     description: Crea un nuevo coche con la información proporcionada
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 format: uuid
 *                 description: ID del usuario propietario del coche
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *                 required: true
 *               brand:
 *                 type: string
 *                 description: Marca del coche
 *                 example: "Toyota"
 *                 required: true
 *               model:
 *                 type: string
 *                 description: Modelo del coche
 *                 example: "Corolla"
 *                 required: true
 *               plate:
 *                 type: string
 *                 description: Placa del coche
 *                 example: "ABC123"
 *                 required: true
 *               color:
 *                 type: string
 *                 description: Color del coche
 *                 example: "Rojo"
 *                 required: true
 *     responses:
 *       201:
 *         description: Coche creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car created
 *                 car:
 *                   $ref: '#/components/schemas/Car'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
carRoute.post("/",validateCreateCar,validateFields,createCar)

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Actualiza un coche existente
 *     description: Actualiza la información de un coche existente basado en su ID
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del coche a actualizar
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
 *               idUser:
 *                 type: string
 *                 format: uuid
 *                 description: Nuevo ID del usuario propietario del coche
 *               brand:
 *                 type: string
 *                 description: Nueva marca del coche
 *               model:
 *                 type: string
 *                 description: Nuevo modelo del coche
 *               plate:
 *                 type: string
 *                 description: Nueva placa del coche
 *               color:
 *                 type: string
 *                 description: Nuevo color del coche
 *     responses:
 *       200:
 *         description: Coche actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car updated
 *                 car:
 *                   $ref: '#/components/schemas/Car'
 *       404:
 *         description: Coche no encontrado
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
carRoute.put("/:id",validateUpdateCar,validateFields,updateCar)

/**
 * @openapi
 * /api/cars/{id}:
 *   delete:
 *     summary: Elimina un coche existente
 *     description: Elimina un coche existente basado en su ID
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del coche a eliminar
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Coche eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car deleted
 *       404:
 *         description: Coche no encontrado
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
carRoute.delete("/:id",validateID,validateFields,deleteCar)

