import {
  Flex,
  cn,
  Body,
  Headline,
  BodyLarge,
} from "@river/design-system";
import { type Channel } from "../../types/types";
import Image from "next/image";
import { ChannelModal } from "../client/AddToChannelModal";
import { shortenAddress } from "../../utils/shortenAddress";
import { Hex } from "viem";

export function ChannelBanner({ channel }: { channel: Channel }) {

  return (
    <Flex className="gap-x-10 h-[248px]">
      <div className="overflow-hidden rounded">
        <Image
          src={channel.cover ? channel.cover : ""}
          alt={channel.name ? channel.name : "Channel name missing"}
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
          <Headline className="font-medium text-[#272727]">{channel.name ? channel.name : "Channel name missing"}</Headline>
          <BodyLarge className="text-[#777777]">
            {channel.creator ? shortenAddress(channel.creator as Hex): ""}
            {channel.members?.length
              ? ` + ${channel.members.length - 1} others`
              : ""}
          </BodyLarge>
          <Body className="text-[#777777]">{channel.description ? channel.description : ""}</Body>
        </div>
        <ChannelModal />
      </Flex>
    </Flex>
  );
}
