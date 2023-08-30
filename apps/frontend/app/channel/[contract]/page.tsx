import { getListings } from '../../../gql/requests/getListings';
import { Flex } from '@river/design-system';

export default async function Channel({
  params,
}: {
  params: { contract: string };
}) {
  // const { channels: listings } = await getListings({
  //   channel: params.contract,
  // });

  return (
    <Flex>

    </Flex>
  );
}
