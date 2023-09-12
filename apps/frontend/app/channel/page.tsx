"use client";

import { LanyardMerkle } from "../../components/client/ChannelUri/LanyardMerkle";
import { Stack } from "@river/design-system";
import { ChannelCreate } from "../../components/client/ChannelCreate";
import { useState } from "react";
import { Channel } from "../../gql/sdk.generated";

export default function Page() {
  const [channelsData, setChannelsData] = useState<Channel | undefined>(undefined);
  const [cid, setCid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Stack>
      <ChannelCreate 
        channels={channelsData} 
        cid={cid} 
        name={name} 
        setName={setName} 
        description={description} 
        setDescription={setDescription} 
      />
      {/* <LanyardMerkle /> */}
    </Stack>
  );
}