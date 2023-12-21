import { hashMessage, Hash, encodePacked, keccak256, toBytes } from 'viem'

export function registerForHash({ expiration }: { expiration: bigint }) {
  const REGISTER_FOR_TYPEHASH = keccak256(
    toBytes('Register(address to,address backup,uint256 deadline)'),
  )

  // console.log(
  //   "hash pre eip191: ",
  //   keccak256(
  //     encodePacked(["bytes32", "uint256"], [REGISTER_FOR_TYPEHASH, expiration])
  //   )
  // );
  // console.log(
  //   "hash post eip191: ",
  //   hashMessage({
  //     raw: keccak256(
  //       encodePacked(
  //         ["bytes32", "uint256"],
  //         [REGISTER_FOR_TYPEHASH, expiration]
  //       )
  //     ),
  //   })
  // );

  return keccak256(
    encodePacked(['bytes32', 'uint256'], [REGISTER_FOR_TYPEHASH, expiration]),
  )
}
