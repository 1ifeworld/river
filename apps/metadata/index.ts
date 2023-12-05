import express from 'express'
import { router as processCid, getRouter } from '@/services'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? 8080

const app = express()
app.use(express.json()) // Add this line

app.use('/process-cid', processCid)

app.use('/get', getRouter)

app.listen(PORT)

console.log(`Listening on port ${PORT}...`)
