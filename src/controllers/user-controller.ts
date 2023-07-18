import express from 'express'

import { userService } from '@service/user-service'
import { validationResult } from 'express-validator'
import { ApiError } from '@exception/api-error'

class UserController {
  async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибки при валидации', errors.array()))
      }

      const { email, password } = req.body
      const userData = await userService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      await userService.logout(req.cookies.refreshToken)
      res.clearCookie('refreshToken')
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const activationLink = req.params.link
      const CLIENT_URL = process.env.CLIENT_URL ?? ''
      await userService.activate(activationLink)
      return res.redirect(CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()
