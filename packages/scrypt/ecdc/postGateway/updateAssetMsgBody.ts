import {
  Hash,
  decodeAbiParameters,
  Hex,
  encodeAbiParameters,
} from "viem";
// import { postGatewayABI } from "../../abi";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeUpdateAssetMsgBody({
  assetCid,
  data,
  access,
}: {
  assetCid: string;
  data: { dataType: number; contents: Hex };
  access: { accessType: number; contents: Hex };
}): {
  msgBody: Hash;
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        {
          components: [
            { internalType: "string", name: "assetCid", type: "string" },
            {
              components: [
                {
                  internalType: "enum IPostGateway.ChannelDataTypes",
                  name: "dataType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ChannelData",
              name: "data",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "enum IPostGateway.ChannelAccessTypes",
                  name: "accessType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ChannelAccess",
              name: "access",
              type: "tuple",
            },
          ],
          internalType: "struct IPostGateway.Channel",
          name: "channel",
          type: "tuple",
        },
      ],
      [{ assetCid, data, access }]
    );

    return {
      msgBody: msgBody,
    };
  } catch (error) {
    console.error("Failed to encode update asset Message body", error);
    return null;
  }
}

//////////////////////////////////////////////////
// DECODING
//////////////////////////////////////////////////

export function decodeUpdateAssetMsgBody({ msgBody }: { msgBody: Hash }): {
  assetCid: string;
  data: { dataType: number; contents: Hex };
  access: { accessType: number; contents: Hex };
} | null {
  try {
    const [{ assetCid, data, access }] = decodeAbiParameters(
      [
        {
          components: [
            { internalType: "string", name: "assetCid", type: "string" },
            {
              components: [
                {
                  internalType: "enum IPostGateway.ChannelDataTypes",
                  name: "dataType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ChannelData",
              name: "data",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "enum IPostGateway.ChannelAccessTypes",
                  name: "accessType",
                  type: "uint8",
                },
                { internalType: "bytes", name: "contents", type: "bytes" },
              ],
              internalType: "struct IPostGateway.ChannelAccess",
              name: "access",
              type: "tuple",
            },
          ],
          internalType: "struct IPostGateway.Channel",
          name: "channel",
          type: "tuple",
        },
      ],
      msgBody
    );

    return {
    assetCid: assetCid,
      data: data,
      access: access,
    };
  } catch (error) {
    console.error("Failed to decode update asset Message body", error);
    return null;
  }
}
