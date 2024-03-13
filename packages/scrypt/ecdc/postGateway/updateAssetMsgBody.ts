import {
  Hash,
  decodeAbiParameters,
  Hex,
  encodeAbiParameters,
  zeroHash,
} from "viem";

//////////////////////////////////////////////////
// ENCODING
//////////////////////////////////////////////////

export function encodeUpdateAssetRoleAccessMsgBody({
  assetCid,
  targetRids,
  roles
}: {
  assetCid: string;
  targetRids: bigint[];
  roles: bigint[];
}): {
  msgBody: Hash;
} | null {
  try {
    const msgBody = encodeAbiParameters(
      [
        {
          components: [
            // assetCid
            { internalType: "string", name: "assetCid", type: "string" },
            // channel struct
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
      [{ 
        assetCid: assetCid,
        data: {
          dataType: 0,
          contents: zeroHash
        },
        access: {
          accessType: 1, // ROLEBASED
          contents: encodeAbiParameters(
            [
              { name: "targetRids", type: "uint256[]" },
              { name: "roles", type: "uint256[]" },
            ],
            [targetRids, roles]
          ),
        },
      }]
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
            // assetCid
            { internalType: "string", name: "assetCid", type: "string" },
            // channel struct
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
