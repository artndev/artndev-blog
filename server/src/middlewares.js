export const isLogged = (req, res, next) => {
    if (!req.cookies.token)
    {
        res.status(401).json({
            message: "You are not authorized"
        })
        return
    }

    next()
}

export const isNotLogged = (req, res, next) => {
    if (req.cookies.token)
    {
        res.status(403).json({
            message: "You have already authorized"
        })
        return
    }

    next()
}

export const isAdmin = (req, res, next) => {
    console.log(process.env.ADMIN_TOKENS.split(" ").includes(req.cookies.token))
    if (!process.env.ADMIN_TOKENS.split(" ").includes(req.cookies.token))
    {
        res.status(403).json({
            message: "You have no access to the request"
        })
        return
    }

    next()
}