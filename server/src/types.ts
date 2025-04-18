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
  Content: string
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

type AccessTokenJwtPayload = {
  user: {
    user_id: number
    username: string
    is_admin: boolean
  }
}
export interface IAccessTokenJwtPayload
  extends JwtPayload,
    AccessTokenJwtPayload {}

type RefreshTokenJwtPayload = {
  user: {
    user_id: number
  }
}
export interface IRefreshTokenJwtPayload
  extends JwtPayload,
    RefreshTokenJwtPayload {}

export interface IRequestAccessToken
  extends Request,
    Partial<AccessTokenJwtPayload> {}

export interface IRequestRefreshToken
  extends Request,
    Partial<RefreshTokenJwtPayload> {}
