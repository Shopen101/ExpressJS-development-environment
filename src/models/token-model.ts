import { Schema, model, Document, SchemaDefinitionProperty } from 'mongoose'

export interface TokenModelInterface {
  _id?: string
  user: SchemaDefinitionProperty<string> | undefined
  refreshToken: string
}

export type UserModelDocumentInterface = TokenModelInterface & Document

const TokenSchema = new Schema<TokenModelInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
})

export const UserModel = model<UserModelDocumentInterface>('User', TokenSchema)
