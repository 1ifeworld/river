export const messageTypes = new Set<bigint>([
// Publications
  BigInt(110),  // createPub (body = abi.encoode(string uri))
  BigInt(111),  // editPubUri  (body = abi.encoode(string uri))
  // Channels
  BigInt(210),  // createChannel (body = abi.encoode(string uri, uint256[] admins, uint256[] members)
  BigInt(211),  // editChannelUri (body = abi.encoode(string uri)
  BigInt(212),  // editChannelAccess (body = abi.encoode(uint256[] admins, uint256[] members)
  BigInt(213),  // addItem (body = abi.encode(uint256 chainId, address target, bool hasId, int256 id, int256 channelId))
  BigInt(214),  // removeItems (body = abi.encode(uint256[]))
  BigInt(215),  // sortItems (body = abi.encode(uint256[], int128[]))
])
