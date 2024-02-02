import { Hash, encodeAbiParameters } from "viem";
import { postGateway2ABI } from "../../abi";
import { createBlockFromAnything, bytesToBase64Url } from "../../lib";

export async function encodeCreateChannelMsgBody({
  name,
  description,
  admins,
  members,
}: {
  name: string;
  description: string;
  admins: bigint[];
  members: bigint[];
}): Promise<{ msgBody: Hash; } | null>  {
  try {
    const channelUriBlock = await createBlockFromAnything({
      name: name,
      description: description,
    });
    const base64EncodedChannelUriBlockBytes = bytesToBase64Url(
      channelUriBlock.bytes
    );

    const encodedCreateChannelStruct = encodeAbiParameters(postGateway2ABI[1].outputs, [
      {
        data: {
          dataType: 1,
          contents: encodeAbiParameters(
            [{ name: "channelUri", type: "string" }],
            [base64EncodedChannelUriBlockBytes]
          ),
        },
        access: {
          accessType: 1,
          contents: encodeAbiParameters(
            [
              { name: "admins", type: "uint256[]" },
              { name: "members", type: "uint256[]" },
            ],
            [admins, members]
          ),
        },
      },
    ]);

    return {
      msgBody: encodedCreateChannelStruct,
    };
  } catch (error) {
    console.error("Failed to encode create channel msgBody", error);
    return null;
  }
}
