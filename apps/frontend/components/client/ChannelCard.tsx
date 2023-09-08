import Image from "next/image";
import Link from "next/link";
import { Body, Card, BodySmall, Stack, cn } from "@river/design-system";
import { Channel } from "../../gql/sdk.generated";
import { truncateText } from "../../utils";
import { ipfsToHttps } from "../../utils";

export function ChannelCard({
  channel,
  className,
}: {
  channel: Channel;
  className?: string;
}) {
  return (
    <Stack className={cn("gap-y-2", className)}>
      {/* Image */}
      <Card className="relative">
        <Link href={`channel/${channel.id}`}>
          <Image
            className="object-cover aspect-square"
            src={ipfsToHttps(channel.contractUri?.image as string)}
            alt={channel.contractUri?.name as string}
            fill
          />
        </Link>
      </Card>
      {/* Caption */}
      <Stack className="max-w-[224px]">
        <Body className="text-label font-medium leading-none">
          {channel.contractUri?.name}
        </Body>
        {channel.logicTransmitterMerkleAdmin[0].accounts ? (
          <BodySmall className="text-label-muted">
            {truncateText(channel?.createdBy, 20)} +{" "}
            {channel.logicTransmitterMerkleAdmin[0].accounts.length - 1} others
          </BodySmall>
        ) : (
          <BodySmall className="text-label-muted">
            {truncateText(channel.createdBy, 30)}
          </BodySmall>
        )}
      </Stack>
    </Stack>
  );
}
