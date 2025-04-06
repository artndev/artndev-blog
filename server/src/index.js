import 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import articles from './routers/articles.js'
import likes from './routers/likes.js'
import users from './routers/users.js'
import saves from './routers/saves.js'
import cookieParser from 'cookie-parser'
import * as middlewares from './middlewares.js'
import config from './config.json' with { type: 'json' }

const app = express()
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use((_, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
})
app.use(express.json())
app.use(cookieParser())

app.use('/articles', articles)
app.use('/users', users)
app.use('/likes', likes)
app.use('/saves', middlewares.isLogged, saves)

const port = config.SERVER_PORT || 8000
app.listen(port, () => console.log(`Server listening on port ${port}`))
