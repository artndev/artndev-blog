import type { Request } from 'express'

export interface IUser {
  user_id: Number
  username: string
  password: string
}

export interface IRequestWithUser extends Request {
  user?: IUser
}
