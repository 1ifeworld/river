import express from 'express'
import { setRouter, getRouter } from './services'

const app = express()

app.use(express.json())
app.use('/set', setRouter)
app.use('/get', getRouter)

export default app;