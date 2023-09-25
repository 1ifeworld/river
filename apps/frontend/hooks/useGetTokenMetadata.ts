import { useState } from 'react'
import { Network, Alchemy, Nft } from 'alchemy-sdk'
import { env } from '@/services'

type Props = {
  network: number
  address: string
  tokenId: string
}

export const useGetTokenMetadata = ({ network, address, tokenId }: Props) => {
  const alchemy_settings_mainnet = {
    apiKey: env.NEXT_PUBLIC_ALCHEMY_KEY,
    network: Network.ETH_MAINNET,
  }
  const alchemyMainnet = new Alchemy(alchemy_settings_mainnet)

  const [tokenMetadata, setTokenMetadata] = useState<Nft>()

  const fetchMetadata = async () => {
    if (network && address && tokenId) {
      const data = await alchemyMainnet.nft.getNftMetadata(address, tokenId)
      if (data) {
        setTokenMetadata(data)
      }
    }
  }

  return { tokenMetadata, fetchMetadata }
}
