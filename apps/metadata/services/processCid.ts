import { Router } from 'express'
import { kv } from '@vercel/kv'
import { redisClient } from 'redisClient'

export const router = Router()

router.post('/', async (req, res) => {
    if (req.body == null) {
        res.status(400).json({ error: 'Request body is missing' })
        return
    }

    setNameForCid({cid: req.body})


    console.log('Your request went through', req.body)

    // Send a successful response back to the client
    res.status(200).json({ message: 'Request processed successfully' })
})



async function setNameForCid({cid}: { cid: string}) {

    const name = 'Harry'

    try {
      await redisClient.set(cid, name);

    } catch (error) {

        console.log("This didn't quite work")
      // Handle errors
    }
  }
