import React from "react";
import { Input, Stack, BodyLarge, Button, Flex } from "@river/estuary";
import { useAccount } from "wagmi";
import { useGetAddressDisplay } from "@/hooks";
import { zeroAddress } from "viem";
import { Popover, PopoverContent, PopoverTrigger } from "@river/estuary";
import { PlusCircle } from "lucide-react";

export function ChannelUri({
  name,
  setName,
  description,
  setDescription,
}: {
  name: string;
  description: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { address } = useAccount();
  const { display } = useGetAddressDisplay(address ? address : zeroAddress);

  return (
    <Stack className="gap-2">
      <Input
        type="text"
        variant="ghost"
        placeholder="Channel Name"
        className="text-2xl"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          console.log("Updated Name:", e.target.value);
        }}
      />
      <Flex>
        <BodyLarge className="text-label-muted">{display} </BodyLarge>

        <Popover>
          <PopoverTrigger>
            <Button className="border-none" size="icon" shape="circle">
              <PlusCircle />
            </Button>
            {/* <LanyardMerkle onMerkleRootChange={setMerkleRoot} /> */}
          </PopoverTrigger>
          <PopoverContent><Input placeholder="Add Members"></Input></PopoverContent>
        </Popover>
      </Flex>
      <Input
        type="text"
        variant="ghost"
        placeholder="Add description"
        onChange={(e) => {
          setDescription(e.target.value);
          console.log("Updated Description:", e.target.value);
        }}
      />
    </Stack>
  );
}
