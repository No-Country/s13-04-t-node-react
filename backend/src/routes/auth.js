import { Router } from "express"
import { login,register } from "../controller/auth.js"
import { validateCreateUser } from "../validators/userValidator.js"
import { validateLogin } from "../validators/loginValidator.js"
import { validateFields } from "../middleware/validatorGeneral.js"
import { validateFiles } from "../validators/fileValidator.js"

const route=Router()

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Operaciones relacionadas con la autenticacion
*/

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión
 *     description: Inicia sesión con las credenciales proporcionadas
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *                 token:
 *                   type: string
 *                   description: Token de sesión JWT
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Unauthorized'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.post("/login",validateLogin,validateFields ,login)

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               identity:
 *                 type: string
 *                 description: Documento de identidad del usuario
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario (opcional)
 *               role:
 *                 type: string
 *                 description: Rol del usuario
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil del usuario (opcional)
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación
 *       400:
 *         description: Error en los datos de entrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/BadRequest'
 *       409:
 *         description: Conflicto, el correo electrónico ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/AlreadyExist'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorSchemas/Error'
*/
route.post("/register", validateFiles, validateCreateUser, validateFields, register)


export default route