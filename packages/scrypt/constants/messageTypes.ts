export const messageTypesSet = new Set<bigint>([
  // Publications
  BigInt(110), // createPub (body = abi.encode(string uri))
  BigInt(111), // editPubUri  (body = abi.encode(string uri))
  // Channels
  BigInt(210), // createChannel (body = abi.encode(string uri, uint256[] admins, uint256[] members))
  BigInt(211), // editChannelUri (body = abi.encode(string uri))
  BigInt(212), // editChannelAccess (body = abi.encode(uint256[] admins, uint256[] members))
  BigInt(213), // addItem (body = abi.encode(uint256 chainId, address target, bool hasId, int256 id, int256 channelId))
  BigInt(214), // removeItems (body = abi.encode(uint256[]))
  BigInt(215), // sortItems (body = abi.encode(uint256[], int128[]))
])

export const messageTypes = {
  createPublication: 110,
  editPublication: 111,
  createChannel: 210,
  editChannelUri: 211,
  editChannelAccess: 212,
  addItem: 213,
  removeItems: 214,
  sortItems: 215,
}
