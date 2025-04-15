import type { Request } from 'express'
import type { RowDataPacket } from 'mysql2'

export interface IJwtPayload {
  user_id: number
  username: string
  password: string
}

export interface IRequestWithUser extends Request {
  user?: IJwtPayload
}

export interface IUser extends RowDataPacket {
  Id: number
  Username: string
  Password: string
  Updated: string
}

export interface IArticle extends RowDataPacket {
  Id: number
  Title: string
  Subtitle: string
  Text: string
  Updated: string
}

export interface ISave extends RowDataPacket {
  ArticleId: number
  UserId: number
}

export interface ILike extends RowDataPacket {
  ArticleId: number
  UserId: number
}

export interface ILikes extends RowDataPacket {
  likes: number
}
