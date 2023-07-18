import express from 'express'
import { ApiError } from '@exception/api-error'
import { tokenService } from '@service/token-service'

export function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    const authorizatonHeader = req.headers.authorization
    if (!authorizatonHeader) {
      return next(ApiError.UnauthorizeError())
    }

    const accessToken = authorizatonHeader.split(' ')[1]
    if (!accessToken) {
      return next(ApiError.UnauthorizeError())
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizeError())
    }

    req.user = userData
    next()
  } catch (error) {
    return next(ApiError.UnauthorizeError())
  }
}
