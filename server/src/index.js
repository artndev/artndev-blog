import "dotenv/config.js"
import articles from "./routers/articles.js"
import likes from "./routers/likes.js"
import users from "./routers/users.js"
import saves from "./routers/saves.js"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import * as middlewares from "./middlewares.js"


const app = express()
app.use(cors())
app.use(express.json())  
app.use(cookieParser());

app.use("/articles", articles)
app.use("/users", users) 
app.use("/likes", likes)
app.use("/saves", middlewares.isLogged, saves) 

const port = process.env.SERVER_PORT || 8000
app.listen(port, () => console.log(`Server listening on port ${port}`))