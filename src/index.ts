import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { router } from '@router'
import { errMiddleware } from '@middlewares/error-middleware'

dotenv.config()

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || ''
const CLIENT_URL = process.env.CLIENT_URL || ''

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  }),
)
app.use('/api', router)
app.use(errMiddleware)

const start = async () => {
  try {
    await mongoose
      .connect(DB_URL)
      .then(() => console.log('Database connected'))
      .catch((e) => console.log(e))
    app.listen(PORT, () => {
      console.log(`Server started on PORT = ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
