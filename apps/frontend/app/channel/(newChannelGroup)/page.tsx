"use client";

import { LanyardMerkle } from "../../../components/client/ChannelUri/LanyardMerkle";
import { Flex, Stack } from "@river/design-system";
import { ChannelCreate } from "../../../components/client/newChannel/ChannelCreate";
import { NewChannelContainer } from "../../../components/client/newChannel/NewChannelContainer";
import { useState, useEffect } from "react";

export default function Page() {
  const [cid, setCid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Stack>
      <NewChannelContainer />

      {/* <div>


      <LanyardMerkle />


      </div> */}
    </Stack>
  );
}
