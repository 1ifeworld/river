import { getListing } from '../../../../gql/requests/getListing';
import { Hex } from 'viem';
import { Flex } from '@river/design-system';

export default async function View({
  params,
}: {
  params: { contract: string, id: string };
}) {

  console.log("what is the id: ", params.id)
  console.log("what is the params: ", params.contract)
  console.log("what is the full listing: ", "1/"+params.contract+"/"+params.id)



  // const { listings } = await getListing({
  //   id: params.id
  // });


  return (

    <Flex className='flex-col '>

      yo
    </Flex>

  );
}
