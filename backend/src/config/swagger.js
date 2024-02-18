import swaggerJsdoc from "swagger-jsdoc";
import {serve, setup} from "swagger-ui-express";

const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "EstacionAPP API", version: "1.0.0" },
      components: {
        schemas: {
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
            },
        }
    }
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