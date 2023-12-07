import express from 'express'
import dotenv from 'dotenv'
import { setRouter, getRouter } from './services'

// Setup run app
dotenv.config()
const app = express()
const PORT = process.env.PORT ?? 8080
app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`);
  /* eslint-enable no-console */
});

app.use(express.json())
app.use('/set', setRouter)
app.use('/get', getRouter)