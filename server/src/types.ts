import type { Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import type { RowDataPacket } from 'mysql2'

export interface IUser extends RowDataPacket {
  Id: number
  Username: string
  Password: string
  Role: string
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

export interface IPasswordTokenJwtPayload extends JwtPayload {
  password: string
}

export interface IAccessTokenJwtPayload extends JwtPayload {
  user: {
    user_id: number
    username: string
    is_admin: boolean
  }
}

export interface IRequestWithUser
  extends Request,
    Partial<IAccessTokenJwtPayload> {}
