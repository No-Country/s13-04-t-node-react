import { Router } from "express";
import {getAllGarages, getGarage, getFilteredGarages,createGarage, updateGarage, deleteGarage } from '../controller/garage.js'
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
 * /api/garages/search:
 *   get:
 *     summary: Obtiene garages filtrados por ubicación y disponibilidad de reservas
 *     description: Retorna una lista de garages que coinciden con la ubicación proporcionada y tienen disponibilidad dentro del rango de fechas especificado.
 *     tags: [Garage]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Ubicación a buscar (país, provincia, ciudad o dirección)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio del rango de disponibilidad de reservas (ISO - 2024-02-21T19:00:00.000Z)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin del rango de disponibilidad de reservas (ISO - 2024-02-21T29:00:00.000Z)
 *     responses:
 *       200:
 *         description: Garages filtrados obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 garages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Garages'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.get('/search', getFilteredGarages)
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
 *                 $ref: '#/components/schemas/Garages'
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
 *               $ref: '#/components/schemas/Garages'
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *                 format: uuid
 *                 description: ID del usuario propietario del garaje
 *               name:
 *                 type: string
 *                 description: Nombre del garaje
 *               address:
 *                 type: string
 *                 description: Dirección del garaje
 *               country:
 *                 type: string
 *                 description: País del garaje
 *               province:
 *                 type: string
 *                 description: Provincia del garaje
 *               city:
 *                 type: string
 *                 description: Ciudad del garaje
 *               zipCode:
 *                 type: string
 *                 description: Código postal del garaje
 *               coordinates:
 *                 type: string
 *                 description: Coordenadas del garaje
 *               capacity:
 *                 type: number
 *                 description: Capacidad del garaje
 *               price:
 *                 type: number
 *                 description: Precio del garaje
 *               whitConfirmation:
 *                 type: boolean
 *                 description: Confirmación requerida para reservas
 *               schedule:
 *                 type: object 
 *                 description: Horario de disponibilidad del garaje en formato JSON
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Imágenes del garaje (opcional)
 *     responses:
 *       200:
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
 *                   $ref: '#/components/schemas/Garages'
 *       400:
 *         description: Error en la solicitud del cliente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/BadRequest'
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Unauthorized'
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
 *             $ref: '#/components/schemas/Garages'
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
 *                   $ref: '#/components/schemas/Garages'
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