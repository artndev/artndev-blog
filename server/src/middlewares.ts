import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const isLoggedAccessToken = (
  req: IRequestAccessToken,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    const accessToken = req.headers.authorization.split(' ')[1]!
    // console.log(
    //   req.headers.authorization,
    //   process.env.JWT_ACCESS_TOKEN_SECRET_KEY
    // )
    if (!jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!)) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    const { user } = jwt.decode(accessToken) as IAccessTokenJwtPayload
    req.user = user
    next()
  } catch (err) {
    //console.log(err)

    res.status(403).json({
      message:
        'Server is not responding or your authorization credentials are incorrect',
      answer: null,
    })
  }
}

export const isLoggedRefreshToken = (
  req: IRequestRefreshToken,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    const refreshToken = req.headers.authorization.split(' ')[1]!
    if (!jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY!)) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    const { user } = jwt.decode(refreshToken) as IRefreshTokenJwtPayload
    req.user = user
    next()
  } catch (err) {
    console.log(err)

    res.status(403).json({
      message:
        'Server is not responding or your authorization credentials are incorrect',
      answer: null,
    })
  }
}

export const isNotLogged = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      res.status(403).json({
        message: 'You have already authorized',
        answer: null,
      })
      return
    }

    next()
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: null,
    })
  }
}

export const isAdmin = (
  req: IRequestAccessToken,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user!.is_admin) {
      res.status(403).json({
        message: 'You have no access to request',
        answer: null,
      })
      return
    }

    next()
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server is not responding',
      answer: null,
    })
  }
}
