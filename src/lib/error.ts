// HTTP 异常
export class HttpError extends Error {

  public code: number
  public error!: Error

  constructor (code: number, message: string, error?: Error) {
    super(message)
    this.code = code
    if (error) this.error = error
  }

  public getErrorInfo () {
    return {
      code: this.code,
      message: this.message
    }
  }
}

// 404
export class NotFoundError extends HttpError {
  constructor (message: string) {
    super(20000, message)
  }
}

// ValidationError -- 400
export class ValidationError extends HttpError {
  constructor (message: string, error?: Error) {
    super(30000, message, error)
  }
}

// UnauthorizedError -- 401
export class UnauthorizedError extends HttpError {
  constructor (error: Error) {
    super(30002, 'Unauthorized user', error)
  }
}

// PermissionError -- 403
export class PermissionError extends HttpError {
  constructor (error?: Error) {
    super(30003, 'Permission denied', error)
  }
}

// 业务中的异常
export class ServiceError extends Error {
  public code: number
  public message: string

  constructor (code: number, message: string) {
    super()
    this.code = code
    this.message = message
  }

  public getErrorInfo () {
    return {
      code: this.code,
      message: this.message
    }
  }
}
