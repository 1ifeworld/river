import { objectKeys } from '../utils'

interface Env {
  NEXT_PUBLIC_ALCHEMY_KEY: string
  NEXT_PUBLIC_WALLET_CONNECT_ID: string
  NEXT_PUBLIC_GRAPHQL_API: string
  NEXT_PUBLIC_WEB3STORAGE_TOKEN: string
  NEXT_PUBLIC_BASEMENT_API: string
}

export const env: Env = {
  NEXT_PUBLIC_ALCHEMY_KEY: process.env.NEXT_PUBLIC_ALCHEMY_KEY as string,
  NEXT_PUBLIC_WALLET_CONNECT_ID: process.env
    .NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  NEXT_PUBLIC_GRAPHQL_API: process.env.NEXT_PUBLIC_GRAPHQL_API as string,
  NEXT_PUBLIC_WEB3STORAGE_TOKEN: process.env
    .NEXT_PUBLIC_WEB3STORAGE_TOKEN as string,
  NEXT_PUBLIC_BASEMENT_API: process.env.NEXT_PUBLIC_BASEMENT_API as string,
}

const frontendKeys = objectKeys(env).filter((key) =>
  key.includes('NEXT_PUBLIC'),
)

const missingKeys: Array<string> = []

frontendKeys.forEach((key) => {
  if (!env[key]) {
    missingKeys.push(key)
  }
})
if (missingKeys.length > 0) {
  throw new Error(`Missing environment variables: ${missingKeys.join(', ')}`)
}
