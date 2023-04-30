import express from 'express'
import { ApiError } from 'src/exception/api-error'

export function errMiddleware(
  err: string | ApiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  console.log('Err => ', err)
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}
