// ./server/routes/status-routes.ts
import express from 'express'

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response, next) => {
  return res.send({ result: 'Your Status' })
})

export default router