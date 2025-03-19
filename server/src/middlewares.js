export const logger = (req, res, next) => {
    if (!req.cookies.token)
    {
        res.status(401).json({
            message: "You are not authorized"
        })
        return
    }

    next()
}

export const adminLogger = (req, res, next) => {
    const { username } = JSON.parse(req.cookies.user_data)

    if (username !== process.env.ADMIN_USERNAME)
    {
        res.status(401).json({
            message: "You are not authorized"
        })
        return
    }

    next()
}