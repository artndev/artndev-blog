import jwt from 'jsonwebtoken'

export const isLogged = (req, res, next) => {
  try {
    console.log(req.headers)
    if (!req.headers.authorization) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!jwt.verify(token, process.env.SECRET_KEY)) {
      res.status(401).json({
        message: 'You are not authorized',
        answer: null,
      })
      return
    }

    req.user = jwt.decode(token)
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

export const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (token !== process.env.ADMIN_TOKEN) {
      res.status(403).json({
        message: 'You have no access to request',
        answer: null,
      })
      return
    }

    req.user = jwt.decode(token)
    next()
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server has not responded',
      answer: null,
    })
  }
}
