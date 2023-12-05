import { Router } from 'express'
import { kv } from '@vercel/kv'
import { redisClient } from 'redisClient'

export const getRouter = Router()

getRouter.get('/', async (req, res) => { 

    try {
        const getExample = await redisClient.get('bafybeih3dpotmeewpv543kzbwhxykm6pqtcw46i6lymcjhvblg6sv455se');
        console.log(getExample);
      } catch (error) {
        // Handle errors
      }

      res.status(200).json({ message: 'Request processed successfully' })


})
