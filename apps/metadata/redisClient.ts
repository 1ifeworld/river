import { createClient } from "@vercel/kv";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
  // url: process.env.KV_REST_API_URL as string,
  // token: process.env.KV_REST_API_TOKEN as string,
  url: process.env.KV_NU_REST_API_URL as string,
  token: process.env.KV_NU_REST_API_TOKEN as string,
});
