'server-only'
import Mux from '@mux/mux-node'
const muxToken = process.env.MUX_TOKEN_ID
const muxSecret = process.env.MUX_TOKEN_SECRET
// Initialize Mux client if both tokens are present
export const muxClient =
  muxToken && muxSecret
    ? new Mux({ tokenId: muxToken, tokenSecret: muxSecret })
    : null
