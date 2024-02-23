import { Router } from "express";
import {getAllGarages, getGarage, getFilteredGarages,createGarage, updateGarage, deleteGarage,addFavoriteGarage, getAllFavoriteGarages,removeFavoriteGarage } from '../controller/garage.js'
import {validateFields} from "../middleware/validatorGeneral.js"
import {validateCreateGarage,validateUpdateGarage,validateDeleteUser} from "../validators/garageValidator.js"
import { validateFiles } from "../validators/fileValidator.js";
import {sessionAuth} from '../middleware/sessionAuth.js'

/**
 * @openapi
 * tags:
 *   name: Garage
 *   description: Operaciones relacionadas con los garages
 */


const route=Router();

/**
 * @openapi
 * /api/garages/my_favorite:
 *   get:
 *     summary: Get all favorite garages
 *     description: Retrieves all the garages marked as favorites by the authenticated user.
 *     tags: [Favorite Garages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorite garages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Garage'
 *       401:
 *         description: Unauthorized - User not logged in.
 *       404:
 *         description: No favorite garages found.
 */
route.get("/my_favorite", sessionAuth, getAllFavoriteGarages)

/**
 * @openapi
 * /api/garages/my_favorite/{id_garage}:
 *   post:
 *     summary: Add a garage to favorites
 *     description: Marks a garage as a favorite for the authenticated user.
 *     tags: [Favorite Garages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_garage
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the garage to mark as favorite.
 *     responses:
 *       201:
 *         description: Garage added to favorites successfully.
 *       401:
 *         description: Unauthorized - User not logged in.
 *       404:
 *         description: Garage not found.
 */
route.post("/my_favorite/:id_garage", sessionAuth, addFavoriteGarage)

/**
 * @openapi
 * /api/garages/my_favorite/{id_garage}:
 *   delete:
 *     summary: Remove a garage from favorites
 *     description: Removes a garage from the authenticated user's list of favorite garages.
 *     tags: [Favorite Garages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_garage
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the garage to remove from favorites.
 *     responses:
 *       200:
 *         description: Garage removed from favorites successfully.
 *       401:
 *         description: Unauthorized - User not logged in.
 *       404:
 *         description: Favorite garage not found.
 */
route.delete("/my_favorite/:id_garage", sessionAuth, removeFavoriteGarage)

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
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: idUser
 *         description: ID del usuario
 *         required: true
 *         type: string
 *       - in: formData
 *         name: name
 *         description: Nombre del garaje
 *         required: true
 *         type: string
 *       - in: formData
 *         name: address
 *         description: Dirección del garaje
 *         required: true
 *         type: string
 *       - in: formData
 *         name: country
 *         description: País del garaje
 *         required: true
 *         type: string
 *       - in: formData
 *         name: province
 *         description: Provincia del garaje
 *         required: true
 *         type: string
 *       - in: formData
 *         name: city
 *         description: Ciudad del garaje
 *         required: true
 *         type: string
 *       - in: formData
 *         name: zipCode
 *         description: Código postal del garaje
 *         required: true
 *         type: string
 *       - in: formData
 *         name: coordinates
 *         description: Coordenadas del garaje
 *         required: true
 *         type: string
 *       - in: formData
 *         name: capacity
 *         description: Capacidad del garaje
 *         required: true
 *         type: integer
 *         format: int32
 *       - in: formData
 *         name: price
 *         description: Precio del garaje
 *         required: true
 *         type: number
 *         format: float
 *       - in: formData
 *         name: whitConfirmation
 *         description: Confirmación requerida
 *         required: true
 *         type: boolean
 *       - in: formData
 *         name: images
 *         description: Imágenes del garaje
 *         required: false
 *         type: array
 *         items:
 *           type: file
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
 *                   $ref: '#/components/schemas/Garages'
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