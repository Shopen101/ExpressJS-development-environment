// data-transfer-object
interface Imodel {
  email: string
  _id: string
}

export class UserDto {
  email: string
  id: string

  constructor(model: Imodel) {
    this.email = model.email
    this.id = model._id
  }
}
