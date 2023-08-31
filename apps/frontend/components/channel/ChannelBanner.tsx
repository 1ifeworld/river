import {
  Flex,
  cn,
  Body,
  BodySmall,
  Headline,
  BodyLarge,
} from "@river/design-system";
import { type Channel } from "../client";
import Image from "next/image";
import { ChannelModal } from "../client/AddToChannelModal";
import { shortenAddress } from "../../utils/shortenAddress";
import { Hex } from "viem";

export function ChannelBanner({ channel }: { channel: Channel }) {
  return (
    <Flex className="gap-x-10 h-[248px]">
      <div className="overflow-hidden rounded">
        <Image
          src={channel.cover}
          alt={channel.name}
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
          <Headline className="font-medium text-[#272727]">{channel.name}</Headline>
          <BodyLarge className="text-[#777777]">
            {shortenAddress(channel.creator as Hex)}
            {channel.members?.length
              ? ` + ${channel.members.length} others`
              : ""}
          </BodyLarge>
          <Body className="text-[#777777]">{channel.description}</Body>
        </div>
        <ChannelModal />
      </Flex>
    </Flex>
  );
}
