import sdk from "../../gql/client";
import { Hex } from "viem";

export async function getAdminChannels(address: Hex) {
    const { channels } = await sdk.allChannels();
  
    const adminChannels = channels.filter(channel => 
      channel.logicTransmitterMerkleAdmin.some(admin => 
        admin.accounts && admin.accounts.includes(address))
    );
  
    return {
      adminChannels,
    };
}
