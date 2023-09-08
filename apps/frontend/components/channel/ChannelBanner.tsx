import {
  Flex,
  cn,
  Body,
  Headline,
  BodyLarge,
} from "@river/design-system";
import Image from "next/image";
import { ChannelModal } from "../client/AddToChannelModal";
import { shortenAddress } from "../../utils/shortenAddress";
import { Hex } from "viem";
import { Channel } from "../../gql/sdk.generated";
import { ipfsToHttps } from "../../utils";

export function ChannelBanner({ channels }: { channels: Channel}) {

  return (
    <Flex className="gap-x-10 h-[248px]">
      <div className="overflow-hidden rounded">
        <Image
          src={ipfsToHttps(channels?.contractUri?.image as string)}
          alt={channels?.contractUri?.name ? channels?.contractUri?.name : "Channel name missing"}
          width={248}
          height={248}
          className={cn("object-cover aspect-square")}
        />
      </div>
      {/* Channel settings */}
      {/* Second Column: Text details */}
      <Flex className="h-full flex-col justify-between">
        <div></div>
        <div className="">
          <Headline className="font-medium text-label">{channels?.contractUri?.name ? channels?.contractUri?.name  : "Channel name missing"}</Headline>
          <BodyLarge className="text-label-muted">
            {channels?.createdBy ? shortenAddress(channels?.createdBy as Hex): ""}
            {channels?.logicTransmitterMerkleAdmin?.length
              ? ` + ${channels?.logicTransmitterMerkleAdmin?.length - 1} others`
              : ""}
          </BodyLarge>
          <Body className="text-label-muted">{channels?.contractUri?.description ? channels?.contractUri?.description : ""}</Body>
        </div>
        <ChannelModal />
      </Flex>
    </Flex>
  );
}
