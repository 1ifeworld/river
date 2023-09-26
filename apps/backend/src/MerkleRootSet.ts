import { ponder } from "@/generated";

ponder.on(
    "LogicTransmitterMerkleAdmin:MerkleRootSet",
    async ({ event, context }) => {
      const { timestamp } = event.block;
      // filter added on tuesday sept 26 @ 6:29pm est
      if (timestamp < 1695763671) return
      //      
      const { LogicTransmitterMerkleAdmin } = context.entities;
  
      const { press, merkleRoot } = event.params;
  
      await LogicTransmitterMerkleAdmin.upsert({
        id: press,
        create: {
          merkleRoot,
        },
        update: {
          merkleRoot,
        },
      });
    }
  );
  