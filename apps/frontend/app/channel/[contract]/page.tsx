import { getListings } from '../../../gql/requests/getListings';
import { type Hex } from 'viem';

export default async function Channel({
  params,
}: {
  params: { contract: Hex };
}) {
  const { channels: listings } = await getListings({
    channel: params.contract,
  });

  return <></>;
}
