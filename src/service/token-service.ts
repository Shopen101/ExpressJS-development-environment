import jwt from 'jsonwebtoken'

import { Imodel } from '@types'
import { tokenModel } from '@models/token-model'
import { UserModelInterface } from '@models/user-model'

type userFromJWT = Omit<UserModelInterface, '_id'> & { id: string }

class TokenService {
  generateTokens(payload: Imodel) {
    const jwtAccessTokenSecret = process.env.JWT_ACCESS_TOKEN || ''
    const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN || ''
    const accessToken = jwt.sign(payload, jwtAccessTokenSecret, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, jwtRefreshTokenSecret, { expiresIn: '30d' })

    return {
      refreshToken,
      accessToken,
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    const token = await tokenModel.create({ user: userId, refreshToken })
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
  }

  validateAccessToken(token: string) {
    try {
      const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN ?? ''
      const userData = jwt.verify(token, JWT_ACCESS_TOKEN)
      return userData as userFromJWT
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token: string) {
    try {
      const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN ?? ''
      const userData = jwt.verify(token, JWT_REFRESH_TOKEN)
      return userData as userFromJWT
    } catch (error) {
      return null
    }
  }
}

export const tokenService = new TokenService()
