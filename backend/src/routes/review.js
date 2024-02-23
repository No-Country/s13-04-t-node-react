import { Router } from "express";
import {getAllReviews, getReview, createReview, updateReview, deleteReview } from '../controller/review.js';

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

export default route;