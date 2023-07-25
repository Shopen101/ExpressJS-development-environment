import express from 'express'

export interface Imodel {
  email: string
  id: string
}

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>
    }
  }
}
