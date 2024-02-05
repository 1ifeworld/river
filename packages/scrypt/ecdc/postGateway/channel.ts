import { Hash, encodeAbiParameters } from "viem";
import { postGateway2ABI } from "../../abi";

export async function encodeCreateChannelMsgBody({
  name,
  description,
  members,
  roles,
}: {
  name: string;
  description: string;
  members: bigint[];
  roles: bigint[];
}): Promise<{ msgBody: Hash; } | null>  {

  console.log("members in func", members)
  console.log("roles in func", roles)

  try {


    console.log("visibility in channel ts", members)
    console.log("visibility in channel ts", roles)


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
              { name: "members", type: "uint256[]" },
              { name: "roles", type: "uint256[]" },
            ],
            [members, roles]
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
