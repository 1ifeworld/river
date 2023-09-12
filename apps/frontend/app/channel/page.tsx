"use client";

import { LanyardMerkle } from "../../components/client/ChannelUri/LanyardMerkle";
import { Stack } from "@river/design-system";
import { ChannelCreate } from "../../components/client/ChannelCreate";
import { useState, useEffect } from "react";
import { Channel } from "../../gql/sdk.generated";

export default function Page() {
  const [channelsData, setChannelsData] = useState<Channel | undefined>(undefined);
  const [cid, setCid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  

  useEffect(() => {
    console.log("Name in Page:", name);
    console.log("Description in Page:", description);
  }, [name, description]);

  return (
    <Stack>
<ChannelCreate 
  cid={cid}
  name={name}
  setName={setName} 
  setDescription={setDescription} 
  description={description}
/>
      {/* <LanyardMerkle /> */}
    </Stack>
  );
}