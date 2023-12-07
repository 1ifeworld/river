import express from 'express';
import dotenv from 'dotenv';
import { setRouter, getRouter } from './services';

// Setup run app
dotenv.config();
const app = express();
const PORT = process.env.PORT ?? 8080;

// CORS Configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle pre-flight requests for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Body parser middleware
app.use(express.json());

// Routes
app.use('/set', setRouter);
app.use('/get', getRouter);

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});

// Export the Express API
export default app;
