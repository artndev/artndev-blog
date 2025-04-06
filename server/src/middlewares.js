import jwt from 'jsonwebtoken'

export const isLogged = (req, res, next) => {
  try {
    if (
      !req.cookies.token ||
      !jwt.verify(req.cookies.token, process.env.SECRET_KEY)
    ) {
      res.clearCookie('user_data').status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

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

export const isNotLogged = (req, res, next) => {
  try {
    if (req.cookies.token) {
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

export const isAdmin = (req, res, next) => {
  try {
    if (process.env.ADMIN_TOKEN !== req.cookies.token) {
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
      message: 'Server has not responded',
      answer: null,
    })
  }
}
