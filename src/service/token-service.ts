import jwt from 'jsonwebtoken'

import { tokenModel } from '@models/token-model'
import { Imodel } from '@types'

class TokenService {
  generateTokens(payload: Imodel) {
    const jwtAccessTokenSecret = process.env.JWT_ACCESS_TOKEN || ''
    const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN || ''
    const accessToken = jwt.sign(payload, jwtAccessTokenSecret, { expiresIn: '2m' })
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
}

export const tokenService = new TokenService()
