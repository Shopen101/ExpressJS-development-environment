import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { UserModel } from '@models/user-model'
import { mailService } from '@service/mail-service'
import { tokenService } from '@service/token-service'
import { UserDto } from '@dtos/user-dto'
import { ApiError } from '@exception/api-error'

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ email })

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashedPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4() // v34fa-4gg45-44frfrf-34r

    const user = await UserModel.create({ email, password: hashedPassword })
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user) // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    user.activationLink = activationLink
    await user.save()

    return {
      ...tokens,
      user: userDto,
    }
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink })

    if (!user) {
      throw ApiError.BadRequest('Некоректная ссылка активации')
    }

    user.isActivated = true
    await user.save()
  }
}

export const userService = new UserService()
