import express from 'express'
import { router as processCid } from '@/services'

const PORT = process.env.PORT ?? 8080

const app = express()
app.use(express.json()) // Add this line


app.use('/process-cid', processCid)

app.listen(PORT)

console.log(`Listening on port ${PORT}...`)
