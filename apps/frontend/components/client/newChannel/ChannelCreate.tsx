import {
  Flex,
  cn,
  Body,
  Card,
  Headline,
  BodyLarge,
} from "@river/design-system";
import Image from "next/image";
import { Channel } from "../../../gql/sdk.generated";
import { ipfsToHttps } from "../../../utils";
import { useState } from "react";
import { ChannelUri } from "../ChannelUri/ChannelUri";

interface ChannelCreateProps {
  channels?: Channel;
  cid: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCid: React.Dispatch<React.SetStateAction<string>>;
}

export function ChannelCreate({
  channels,
  cid,
  name,
  setName,
  description,
  setDescription,
  setCid,
}: ChannelCreateProps) {
  return (
    <Flex className="gap-x-10 h-[248px]">
      <Card size="lg" className="relative  w-[300px] h-[300px] bg-base-border">
        {cid && (
          <Image
            className="object-cover aspect-square"
            src={`https://ipfs.io/ipfs/${cid}`}
            alt="alt missing"
            fill
          />
        )}
      </Card>

      {/* Channel settings */}
      {/* Second Column: Text details */}
      <Flex className="h-full flex-col justify-between cursor-default">
        <div></div>
        <div className="">
          <Body className="text-label-muted">{description || ""}</Body>
        </div>
        <ChannelUri
          cid={cid}
          setCid={setCid}
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
        />
      </Flex>
    </Flex>
  );
}
