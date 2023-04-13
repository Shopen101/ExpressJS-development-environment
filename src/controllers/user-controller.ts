import express from 'express'

class UserController {
  async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  async activate(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  async getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      res.json(['test', 123])
    } catch (error) {
      console.log(error)
    }
  }
}

export const userController = new UserController()
