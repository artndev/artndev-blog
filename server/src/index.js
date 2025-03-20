import "dotenv/config.js"
import articles from "./routers/articles.js"
import likes from "./routers/likes.js"
import users from "./routers/users.js"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import * as middlewares from "./middlewares.js"


const app = express()
app.use(cors())
app.use(express.json())  
app.use(cookieParser());

// COMPLETE ARTICLES ROUTE!
// make middlewares for users when theres no token or it is
// in middleware make verifying token and checking by it if user is authorized

app.use("/", articles) // route for articles viewing
app.use("/users", users) // route for authorizing
app.use("/likes", middlewares.isLogged, likes) // route for likes

const port = process.env.SERVER_PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))