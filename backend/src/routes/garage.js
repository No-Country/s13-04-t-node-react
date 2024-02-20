import { Router } from "express";
import {getAllGarages, getGarage, createGarage, updateGarage, deleteGarage } from '../controller/garage.js'
import {validateFields} from "../middleware/validatorGeneral.js"
import {validateCreateGarage,validateUpdateGarage,validateDeleteUser} from "../validators/garageValidator.js"
import { validateFiles } from "../validators/fileValidator.js";

/**
 * @openapi
 * tags:
 *   name: Garage
 *   description: Operaciones relacionadas con los garages
 */


const route=Router();

/**
 * @openapi
 * /api/garages:
 *   get:
 *     summary: Obtiene todos los garages
 *     description: Retorna una lista de garages
 *     tags: [Garage]
 *     responses:
 *       200:
 *         description: garages obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Garage'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
 */
route.get("/",getAllGarages)

/**
 * @openapi
 * /api/garages/{id}:
 *   get:
 *     summary: Obtiene un garaje por su ID
 *     description: Retorna un garaje basado en su ID
 *     tags: [Garage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del garaje a obtener
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Garaje obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Garage'
 *       404:
 *         description: Garaje no encontrado
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
route.get("/:id",getGarage)

/**
 * @openapi
 * /api/garages:
 *   post:
 *     summary: Crea un nuevo garaje
 *     description: Crea un nuevo garaje con la información proporcionada
 *     tags: [Garage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GarageCreateRequest'
 *     responses:
 *       201:
 *         description: Garaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Garage created
 *                 garage:
 *                   $ref: '#/components/schemas/Garage'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
 */
route.post("/", validateFiles, validateCreateGarage, validateFields, createGarage)

/**
 * @openapi
 * /api/garages/{id}:
 *   patch:
 *     summary: Actualiza un garaje existente
 *     description: Actualiza la información de un garaje existente basado en su ID
 *     tags: [Garage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del garaje a actualizar
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GarageUpdateRequest'
 *     responses:
 *       200:
 *         description: Garaje actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Garage updated
 *                 garage:
 *                   $ref: '#/components/schemas/Garage'
 *       404:
 *         description: Garaje no encontrado
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
route.patch("/:id",validateUpdateGarage,validateFields,updateGarage)

/**
 * @openapi
 * /api/garages/{id}:
 *   delete:
 *     summary: Elimina un garaje existente
 *     description: Elimina un garaje existente basado en su ID
 *     tags: [Garage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del garaje a eliminar
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Garaje eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Garage deleted
 *       404:
 *         description: Garaje no encontrado
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
route.delete("/:id",validateDeleteUser,validateFields,deleteGarage)


export default route;