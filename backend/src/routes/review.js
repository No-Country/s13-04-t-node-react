import { Router } from "express";
import {getAllReviews, getReview, createReview, updateReview, deleteReview,getAverageReviewRating } from '../controller/review.js';

const route=Router();
/**
 * @openapi
 * tags:
 *   name: Reviews
 *   description: Operaciones relacionadas con las reviews
*/
/**
 * @openapi
 * /api/reviews:
 *   get:
 *     summary: Obtiene todas las revisiones
 *     description: Retorna todas las revisiones
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Retorna la lista de revisiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/review'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.get("/", getAllReviews);

/**
 * @openapi
 * /api/reviews/{id}:
 *   get:
 *     summary: Obtiene una revisión por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la revisión
 *         schema:
 *           type: string
 *     description: Retorna un revision por ID
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Retorna los detalles de la revisión
 *       404:
 *         description: No se encuentra la revisión con el ID especificado
*/
route.get("/:id", getReview);

/**
 * @openapi
 * /api/reviews:
 *   post:
 *     summary: Crea una nueva revisión
 *     requestBody:
 *       description: Datos de la nueva revisión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_author:
 *                 type: string
 *               id_receiver:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: ['User', 'Garage']
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     description: Crea una nueva revision
 *     tags: [Reviews]
 *     responses:
 *       201:
 *         description: Revisión creada exitosamente
 *       400:
 *         description: Error en la solicitud
*/
route.post("/", createReview);

/**
 * @openapi
 * /api/reviews/{id}:
 *   patch:
 *     summary: Actualiza una revisión por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la revisión
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos actualizados de la revisión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     description: Actualiza una revisión por su ID
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Revisión actualizada exitosamente
 *       404:
 *         description: No se encuentra la revisión con el ID especificado
 *       400:
 *         description: Error en la solicitud
*/
route.patch("/:id", updateReview);

/**
 * @openapi
 * /api/reviews/{id}:
 *   delete:
 *     summary: Elimina una revisión por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la revisión
 *         schema:
 *           type: string
 *     description: Elimina una revisión por su ID
 *     tags: [Reviews]
 *     responses:
 *       204:
 *         description: Revisión eliminada exitosamente
 *       404:
 *         description: No se encuentra la revisión con el ID especificado
 *       400:
 *         description: Error en la solicitud
*/

route.delete("/:id", deleteReview);

/**
 * @openapi
 * /api/reviews/average/{id_receiver}:
 *   get:
 *     summary: Obtiene el promedio de las calificaciones de las revisiones por el ID del receptor
 *     parameters:
 *       - in: path
 *         name: id_receiver
 *         required: true
 *         description: ID del receptor de las revisiones
 *         schema:
 *           type: string
 *     description: Retorna el promedio de las calificaciones de las revisiones para un receptor específico, junto con el total de revisiones. El promedio de las calificaciones se calcula basado en todas las revisiones existentes para el receptor especificado.
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Promedio de las calificaciones obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_receiver:
 *                   type: string
 *                   description: ID del receptor de las revisiones
 *                 averageRating:
 *                   type: string
 *                   description: Promedio de las calificaciones de las revisiones, formateado a dos decimales
 *                 totalReviews:
 *                   type: integer
 *                   description: Total de revisiones consideradas para el cálculo del promedio
 *       404:
 *         description: No se encuentran revisiones para el ID del receptor especificado
 *       400:
 *         description: Error en la solicitud
 */

route.get("/average/:id_receiver", getAverageReviewRating)

export default route;