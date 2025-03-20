import jwt from "jsonwebtoken";


export const isLogged = (req, res, next) => {
    try {
        if (
            !req.cookies.token ||
            !jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        )
        {
            res.status(401).json({
                message: "You are not authorized"
            })
            return
        }        

        next()
    } catch (err) {
        console.log(err)

        res.status(403).json({
            message: "The server has not responded or your authorization credentials has been incorrect"
        })
    }
}

export const isNotLogged = (req, res, next) => {
    try {
        if (req.cookies.token)
        {
            res.status(403).json({
                message: "You have already authorized"
            })
            return
        }
        
        next()       
    } 
    catch (err) {
        console.log(err)

        res.status(500).json({
            message: "The server has not responded"
        })
    }
}

export const isAdmin = (req, res, next) => {
    try {
        if (!process.env.ADMIN_TOKENS.split(" ").includes(req.cookies.token))
        {
            res.status(403).json({
                message: "You have no access to the request"
            })
            return
        }
        
        next()   
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "The server has not responded"
        })        
    }
}