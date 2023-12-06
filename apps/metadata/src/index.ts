import app from './app';
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${PORT}`);
  /* eslint-enable no-console */
});