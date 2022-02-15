import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'

//import routes

import('./config/database.js')

const app = express()

app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'build')
  )
)

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

// routers

app.use(function (req, res, next) {
  res.status(404).json({err:"Not found"})
})

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({err: err.message})
})

app.get('/*', function (req, res) {
  res.sendFile(
    path.dirname(fileURLToPath(import.meta.url), 'build', 'index.html')
  )
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
