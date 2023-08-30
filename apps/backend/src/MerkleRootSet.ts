import { ponder } from "@/generated";

ponder.on(
    "LogicTransmitterMerkleAdmin:MerkleRootSet",
    async ({ event, context }) => {
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
  