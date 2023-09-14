import { Hex } from 'viem'

export interface LogicTransmitterMerkleAdmin {
  id: string
  merkleRoot: string
  press: string
  accounts: [string]
  roles: [boolean]
}

export interface ContractUri {
  id: string
  uri: string
  name: string
  description?: string
  image: string
  updatedAt: bigint
}

export interface Channel {
  id: string
  listings?: Listing
  contractUri: ContractUri
  createdAt: bigint
  createdBy: string
  logicTransmitterMerkleAdmin: LogicTransmitterMerkleAdmin
}

export interface PieceMetadata {
  id: string
  pieceName?: string
  pieceCreator: Hex
  pieceDescription?: string
  pieceImageURL?: string
  pieceAnimationURL?: string
  pieceCreatedDate: string
  pieceContentType?: string
}

export interface Listing {
  chainId: bigint
  tokenId: bigint
  listingAddress: Hex
  hasTokenId: boolean
}

export interface ListingExtended extends Listing {
  id: string
  createdAt: bigint
  createdBy: Hex
  channel?: Channel
  listingTargetMetadata?: PieceMetadata | null
}
