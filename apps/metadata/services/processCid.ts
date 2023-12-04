import { Router } from 'express'

export const router = Router()

router.post('/', async (req, res) => {
    if (req.body == null) {
        res.status(400).json({ error: 'Request body is missing' })
        return
    }

    console.log('Your request went through', req.body)

    // Send a successful response back to the client
    res.status(200).json({ message: 'Request processed successfully' })
})