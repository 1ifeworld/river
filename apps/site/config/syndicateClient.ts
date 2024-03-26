import { SyndicateClient } from "@syndicateio/syndicate-node";

export const syndicate = new SyndicateClient({
    token: () => {
      const apiKey = process.env.SYNDICATE_API_KEY
      if (typeof apiKey === "undefined") {
        throw new Error("SYNDICATE_API_KEY is not defined in environment variables.")
      }
      return apiKey;
    },
  });