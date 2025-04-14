import jwt from 'jsonwebtoken'
import type { NextFunction, Response } from 'express'
import type { IRequestWithUser, IUser } from './types.ts'

export const isLogged = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.headers)

    if (!req.headers.authorization) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    const token: string = req.headers.authorization.split(' ')[1]!
    if (!jwt.verify(token, process.env.SECRET_KEY!)) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    req.user = jwt.decode(token) as IUser
    next()
  } catch (err) {
    console.log(err)

    res.status(403).json({
      message:
        'Server has not responded or your authorization credentials are incorrect',
      answer: null,
    })
  }
}

export const isNotLogged = (
  req: IRequestWithUser,
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
      message: 'Server has not responded',
      answer: null,
    })
  }
}

export const isAdmin = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.headers.authorization!.split(' ')[1]!
    if (token !== process.env.ADMIN_TOKEN) {
      res.status(403).json({
        message: 'You have no access to request',
        answer: null,
      })
      return
    }

    req.user = jwt.decode(token) as IUser
    next()
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server has not responded',
      answer: null,
    })
  }
}
