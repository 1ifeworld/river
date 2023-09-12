"use client";

import { LanyardMerkle } from "../../components/client/ChannelUri/LanyardMerkle";
import { Flex, Stack } from "@river/design-system";
import { ChannelCreate } from "../../components/client/ChannelCreate";
import { useState, useEffect } from "react";


export default function Page() {
  const [cid, setCid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Stack>
<ChannelCreate 
  setCid={setCid}
  cid={cid}
  name={name}
  setName={setName} 
  setDescription={setDescription} 
  description={description}
/>
{/* <div>


      <LanyardMerkle />


      </div> */}

    </Stack>
  );
}