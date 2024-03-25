'server-only'
import Mux from '@mux/mux-node'
const muxToken = process.env.MUX_TOKEN_ID
export const muxClient = muxToken ? new Mux({ tokenId: muxToken }) : null
