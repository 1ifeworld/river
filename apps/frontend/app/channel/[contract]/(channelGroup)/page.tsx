import { getChannel } from "../../../../gql/requests/getChannel";
import { Flex } from "@river/design-system";
import { ChannelBanner, ChannelBody } from "../../../../components/channel";
import { Channel } from '../../../../gql/sdk.generated';
import { getAddress } from "viem";

export default async function Channel({
  params,
}: {
  params: { contract: string };
}) {
  const { channels } = await getChannel({
    channel: getAddress(params.contract) as string,
  });

  return (
    <Flex className="flex-col my-[80px] gap-y-[88px]">
      <ChannelBanner channels={channels?.[0]} />
      <ChannelBody listings={channels[0]?.listings} />
    </Flex>      
  );
}
