import "dotenv/config.js"
import articles from "./routers/articles.js"
import admin from "./routers/admin.js"
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
app.use("/", articles) // route for articles viewing
app.use("/users", users) // route for authorizing

// check if user is authorized
app.use("/likes", middlewares.logger, likes) // route for likes

// check if user is admin
app.use("/admin", middlewares.adminLogger, admin) // route for articles editing

const port = process.env.SERVER_PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))