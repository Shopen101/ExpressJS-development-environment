import { Router } from 'express'
import { userController } from '@controllers/user-controller'
import { body } from 'express-validator'
import { authMiddleware } from '@middlewares/auth-middleware'

export const router = Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3 }),
  userController.registration,
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUser)
