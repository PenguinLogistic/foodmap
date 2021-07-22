// ./server/index.ts

import next from 'next'
import express, { Request, Response } from 'express'
import routes from './routes/'
require('dotenv').config();

const dev = process.env.NODE_ENV === "development"
//const domain = process.env.SERVER_DOMAIN
const apiPath = process.env.API_PATH
const port = process.env.SERVER_PORT
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true })) // Uses URL encoded query strings

  app.use(apiPath, routes)

  app.all('*', (req: Request, res: Response) => {
    return handle(req, res)
  })

  app.listen(port, (err?: any) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
  })
})