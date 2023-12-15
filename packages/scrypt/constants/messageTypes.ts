export const messageTypes = {
  createChannel: BigInt(100),
  referenceChannel: BigInt(101),
  editChannelUri: BigInt(102),
  editChannelAccess: BigInt(103),
  createPublication: BigInt(200),
  referencePublication: BigInt(201),
  editPublicationUri: BigInt(202),
  createNft: BigInt(300),
  referenceNft: BigInt(301),
  createUrl: BigInt(400),
  referenceUrl: BigInt(401),
  editUrl: BigInt(402),
  removeReference: BigInt(500),
}

export const messageTypeSet = new Set<bigint>([
    // Channels
    BigInt(100),  // createChannel (abi.encode(string uri, uint256[] admins, uint256[] members, uint256[] channelTags))
    BigInt(101),  // referenceChannel (abi.encode(uint256 channelId, uint256[] channelTags))
    BigInt(102),  // editChannelUri (abi.encode(uint256 channelId, string uri))
    BigInt(103),  // editChannelAccess (abi.encode(uint256 channelId, uint256[] admins, uint256[] members))
    // Publications
    BigInt(200),  // createPublication (abi.encode(string uri, uint256[] channelTags))
    BigInt(201),  // referencePublication (abi.encode(uint256 publicationId, uint256[] channelTags))
    BigInt(202),  // editPublicationUri (abi.encode(uint256 channelId, string uri))
    // NFT + URL messages not enabled yet
    // Removal
    BigInt(500)   // removeReference (uint256)
  ])