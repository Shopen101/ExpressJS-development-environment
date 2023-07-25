import { Schema, model, Document } from 'mongoose'

export interface UserModelInterface {
  _id?: string
  email: string
  password: string
  activationLink: string
}

export type UserModelDocumentInterface = UserModelInterface & Document

const UserSchema = new Schema<UserModelInterface>({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
})

export const UserModel = model<UserModelDocumentInterface>('users', UserSchema)
