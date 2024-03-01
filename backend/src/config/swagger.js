import swaggerJsdoc from "swagger-jsdoc";
import {serve, setup} from "swagger-ui-express";

const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "EstacionAPP API", version: "1.0.0" },
      
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
            User: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    example: "123e4567-e89b-12d3-a456-426614174000",
                    description: "ID del usuario (UUID)"
                  },
                  name: {
                    type: "string",
                    example: "John Doe",
                    description: "Nombre del usuario"
                  },
                  identity: {
                    type: "string",
                    example: "12345678",
                    description: "Identificación del usuario"
                  },
                  email: {
                    type: "string",
                    example: "johndoe@example.com",
                    description: "Correo electrónico del usuario"
                  },
                  password: {
                    type: "string",
                    example: "password123",
                    description: "Contraseña del usuario"
                  },
                  phone: {
                    type: "string",
                    example: "1234567890",
                    description: "Número de teléfono del usuario"
                  },
                  role: {
                    type: "string",
                    enum: ["parking", "user"],
                    example: "user",
                    description: "Rol del usuario ('parking' o 'user')"
                  },
                  rating: {
                    type: "number",
                    format: "float",
                    example: 4.5,
                    description: "Calificación del usuario (puede ser null)"
                  },
                  image: {
                    type: "string",
                    example: "https://example.com/profile.jpg",
                    description: "URL de la imagen de perfil del usuario"
                  }
                },
                required: ["name", "identity", "email", "password", "role"]
            },
            Car: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        example: "123e4567-e89b-12d3-a456-426614174000",
                        description: "ID del coche (UUID)"
                    },
                    brand: {
                        type: "string",
                        example: "Toyota",
                        description: "Marca del coche"
                    },
                    model: {
                        type: "string",
                        example: "Corolla",
                        description: "Modelo del coche"
                    },
                    plate: {
                        type: "string",
                        example: "ABC123",
                        description: "Placa del coche"
                    },
                    color: {
                        type: "string",
                        example: "Rojo",
                        description: "Color del coche"
                    }
                },
                required: ["brand", "model", "plate", "color"]
            },
            
    Review:{
        type: "object",
        properties: {
        id: {
          type: "string",
          format: "uuid",
          example: "123e4567-e89b-12d3-a456-426614174000",
          description: "ID de la revisión (UUID)"},
        id_author: {
          type: "string",
          format: "uuid",
          example: "123e4567-e89b-12d3-a456-426614174001",
          description: "ID del autor de la revisión (UUID)"},
        id_receiver:{
          type: "string",
          format: "uuid",
          example: "123e4567-e89b-12d3-a456-426614174002",
          description: "ID del receptor de la revisión (UUID)"},
        type:{
          type: "string",
          enum:[
             'User',
             'Garage'],
          description: "Tipo de revisión (User/Garage)"},
        rating:{
          type: "number",
          description: "Calificación de la revisión"},
        comment:{
          type: "string",
          description: "Comentario de la revisión"},
      required:[
         "id_author",
         "id_receiver",
         "type",
         "rating"]}},
            Garages: {
              type: "object",
              properties: {
                  id: {
                      type: "string",
                      format: "uuid",
                      example: "d290f1ee-6c54-4b01-90e6-d701748f0851",
                      description: "ID único del garaje (UUID)"
                  },
                  idUser: {
                      type: "string",
                      format: "uuid",
                      description: "ID del usuario propietario del garaje"
                  },
                  name: {
                      type: "string",
                      example: "Garaje Central",
                      description: "Nombre del garaje"
                  },
                  address: {
                      type: "string",
                      example: "Calle Falsa 123",
                      description: "Dirección del garaje"
                  },
                  country: {
                      type: "string",
                      example: "España",
                      description: "País donde se encuentra el garaje"
                  },
                  province: {
                      type: "string",
                      example: "Barcelona",
                      description: "Provincia donde se encuentra el garaje"
                  },
                  city: {
                      type: "string",
                      example: "Barcelona",
                      description: "Ciudad donde se encuentra el garaje"
                  },
                  zipCode: {
                      type: "string",
                      example: "08001",
                      description: "Código postal del garaje"
                  },
                  capacity: {
                      type: "integer",
                      example: 5,
                      description: "Capacidad máxima de vehículos del garaje"
                  },
                  amount: {
                      type: "integer",
                      example: 0,
                      description: "Cantidad actual de vehículos en el garaje"
                  },
                  price: {
                      type: "number",
                      format: "double",
                      example: 15.5,
                      description: "Precio por hora de estacionamiento"
                  },
                  whitConfirmation: {
                      type: "boolean",
                      example: false,
                      description: "Indica si el garaje requiere confirmación para reservar"
                  },
                  available: {
                      type: "boolean",
                      example: true,
                      description: "Disponibilidad actual del garaje"
                  },
                  coordinates: {
                      type: "string",
                      example: "41.40338, 2.17403",
                      description: "Coordenadas geográficas del garaje"
                  },
                  rating: {
                      type: "number",
                      format: "float",
                      example: 4.5,
                      description: "Calificación promedio del garaje"
                  }
              },
              required: ["idUser", "name", "address", "country", "province", "city", "zipCode", "capacity", "price", "whitConfirmation", "available", "coordinates"]
            },
            FavoriteGarages: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    description: "Unique identifier for the Favorite Garage"
                  },
                  idUser: {
                    type: "string",
                    format: "uuid",
                    description: "Identifier of the User who favorited the garage"
                  },
                  idGarage: {
                    type: "string",
                    format: "uuid",
                    description: "Identifier of the Garage that has been favorited"
                  }
                },
                required: ["idUser", "idGarage"]
              },

            Booking: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                    example: "123e4567-e89b-12d3-a456-426614174000",
                    description: "ID de la reserva (UUID)"
                  },
                  date_start: {
                    type: "string",
                    format: "date-time",
                    example: "2024-02-19T08:00:00Z",
                    description: "Fecha de inicio de la reserva"
                  },
                  date_end: {
                    type: "string",
                    format: "date-time",
                    example: "2024-02-20T08:00:00Z",
                    description: "Fecha de fin de la reserva"
                  },
                  status: {
                    type: "string",
                    enum: ["pending", "active", "inactive"],
                    example: "pending",
                    description: "Estado de la reserva"
                  },
                  id_car: {
                    type: "string",
                    format: "uuid",
                    example: "123e4567-e89b-12d3-a456-426614174000",
                    description: "ID del coche asociado a la reserva (UUID)"
                  },
                  id_garage: {
                    type: "string",
                    format: "uuid",
                    example: "123e4567-e89b-12d3-a456-426614174000",
                    description: "ID del garaje asociado a la reserva (UUID)"
                  }
                },
                required: ["date_start", "date_end", "status", "id_car", "id_garage"]
            },
            ErrorSchemas:{
                Error: {
                    type : "object",
                    properties: {
                        error: {
                            type: "boolean",
                            example: true,
                            description: "Indica si ocurrio un error"
                        },
                        message: {
                            type: "string",
                            example: "An internal error occurred on the server",
                            description: "Indica el mensaje de error"
                        },
                        statusCode: {
                            type: "integer",
                            example: 500,
                            description: "Indica el codigo de status"
                        }
                    }
                },
                NotFound: {
                    type : "object",
                    properties: {
                        error: {
                            type: "boolean",
                            example: true,
                            description: "Indica si ocurrio un error"
                        },
                        message: {
                            type: "string",
                            example: "User not found",
                            description: "Indica el mensaje de error"
                        },
                        statusCode: {
                            type: "integer",
                            example: 404,
                            description: "Indica el codigo de status"
                        }
                    }
                },
                BadRequest: {
                    type : "object",
                    properties: {
                        error: {
                            type: "boolean",
                            example: true,
                            description: "Indica si ocurrio un error"
                        },
                        message: {
                            type: "string",
                            example: "Bad Request",
                            description: "Indica el mensaje de error"
                        },
                        statusCode: {
                            type: "integer",
                            example: 400,
                            description: "Indica el codigo de status"
                        }
                    }
                },
                AlreadyExist: {
                    type : "object",
                    properties: {
                        error: {
                            type: "boolean",
                            example: true,
                            description: "Indica si ocurrio un error"
                        },
                        message: {
                            type: "string",
                            example: "Resource already exist",
                            description: "Indica el mensaje de error"
                        },
                        statusCode: {
                            type: "integer",
                            example: 403,
                            description: "Indica el codigo de status"
                        }
                    }
                },
                Unauthorized: {
                    type : "object",
                    properties: {
                        error: {
                            type: "boolean",
                            example: true,
                            description: "Indica si ocurrio un error"
                        },
                        message: {
                            type: "string",
                            example: "Unauthorized",
                            description: "Indica el mensaje de error"
                        },
                        statusCode: {
                            type: "integer",
                            example: 401,
                            description: "Indica el codigo de status"
                        }
                    }
                },
                Conflict: {
                  type : "object",
                  properties: {
                      error: {
                          type: "boolean",
                          example: true,
                          description: "Indica si ocurrio un error"
                      },
                      message: {
                          type: "string",
                          example: "Conflict",
                          description: "Indica el mensaje de error"
                      },
                      statusCode: {
                          type: "integer",
                          example: 409,
                          description: "Indica el codigo de status"
                      }
                  }
              },
            },
        }
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    },
    apis: ['./src/routes/*.js' , './src/models/*.js'],
};
  

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app, port) => {
  app.use("/api/docs", serve, setup(swaggerSpec));
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/docs`
  );
};