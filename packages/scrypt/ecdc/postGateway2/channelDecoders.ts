// import { Hash, slice, encodePacked, decodeAbiParameters, Hex } from "viem";
// import { messageABI } from "../../abi";
// import { postGateway2ABI } from "../../abi";

// //////////////////////////////////////////////////
// // DECODING
// //////////////////////////////////////////////////

// export function decodeCreateChannel_100({ contents }: { contents: Hash }): {
//   data: { dataType: number; contents: Hex };
//   access: { accessType: number; contents: Hex };
// } | null {
//   try {
//     const [{ data, access }] = decodeAbiParameters(
//       postGateway2ABI[0].outputs,
//       contents
//     );

//     return {
//       data: data,
//       access: access,
//     };
//   } catch (error) {
//     console.error("Failed to decode Message body", error);
//     return null;
//   }
// }
