"use client";

import { LanyardMerkle } from "../../components/client/ChannelUri/LanyardMerkle";
import { Stack } from "@river/design-system";
import { ChannelUri } from "../../components/client/ChannelUri/ChannelUri";

export default function Page() {
  return (
    <Stack>
      <ChannelUri />
      <LanyardMerkle />
    </Stack>
  );
}
