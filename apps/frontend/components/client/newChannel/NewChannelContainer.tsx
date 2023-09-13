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
import { CardWithUpload } from ".";

export function NewChannelContainer() {
  const [cid, setCid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <Flex className="gap-x-10 h-[248px]">
      <CardWithUpload imageCid={cid} setImageCid={setCid} />
      {/* Channel settings */}
      {/* Second Column: Text details */}
      {/* <Flex className="h-full flex-col justify-between cursor-default">
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
      </Flex> */}
    </Flex>
  );
}
