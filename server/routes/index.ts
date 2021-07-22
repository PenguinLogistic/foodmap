// ./server/routes/index.ts
import express from 'express'
import statusRouter from '@routes/status-routes'
import movieRouter from '@routes/movies'

const router = express.Router()

router.use(`/movies`, movieRouter)

export default router