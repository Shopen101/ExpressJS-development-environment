// data-transfer-object
interface Imodel {
  email: string
  _id: string
  isActivated: boolean
}

export class UserDto {
  email: string
  id: string
  isActivated: boolean

  constructor(model: Imodel) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}
