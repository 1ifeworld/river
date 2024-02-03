import { Hash, encodeAbiParameters } from "viem";
import { postGateway2ABI } from "../../abi";

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

    const encodedCreateChannelStruct = encodeAbiParameters(postGateway2ABI[1].outputs, [
      {
        data: {
          dataType: 1,
          contents: encodeAbiParameters(
            [
              { name: "name", type: "string" },
              { name: "description", type: "string" },
          ],
            [name, description]
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
