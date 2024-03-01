export const errorHandler = (error, req, res, next) => {
  console.log(error)
  res.status(error.statusCode || 500).json({
    error: true,
    message: error.message || "An internal error occurred on the server",
    statusCode: error.statusCode || 500
  });
};

export class BadRequest extends Error{
  constructor(message) {
    super()
    this.name = this.constructor.name

    this.message = message || "Bad request"
    this.statusCode = 400
  }
}

export class NotFound extends Error{
  constructor(message) {
    super()
    this.name = this.constructor.name

    this.message = message || "Resource not found"
    this.statusCode = 404
  }
}

export class AlreadyExist extends Error{
  constructor(message) {
    super()
    this.name = this.constructor.name

    this.message = message || "Resource already exist"
    this.statusCode = 403
  }
}

export class Unauthorized extends Error{
  constructor(message) {
    super()
    this.name = this.constructor.name

    this.message = message || "Unauthorized"
    this.statusCode = 401
  }
}

export class Conflict extends Error{
  constructor(message) {
    super()
    this.name = this.constructor.name

    this.message = message || "Conflict"
    this.statusCode = 409
  }
}