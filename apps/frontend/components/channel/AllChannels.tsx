// import { Flex, cn, Body, BodySmall } from '@river/design-system';
// import Image from 'next/image';
// import { shortenAddress } from '../../utils/shortenAddress';
// import { type Channel, type ContractUri } from '../../types/types';

// function truncateText(text: string, maxLength: number) {
//   if (!text) return ''; // Return an empty string if text is undefined
//   if (text.length <= maxLength) return text;
//   return text.slice(0, maxLength) + '...';
// }

// export function AllChannels({ channel, contractUri }: { channel: Channel[], contractUri: ContractUri}) {
//   if (!channel || channel.length === 0) {
//     return <div>No Channels available.</div>;
//   }
//   return (
//     <Flex className='gap-x-10'>
//       <div className={`grid grid-cols-6 gap-x-[21px] gap-y-[18px] pb-4`}>
//         {channel.map((channel: Channel, index: number) => (
//           <Flex className={cn('flex-col gap-y-2')}>
//             <div id={contractUri?.name} className='overflow-hidden rounded'>
//               <Image
//                 src={contractUri.cover}
//                 alt={contractUri?.name || ''}
//                 width={224}
//                 height={224}
//                 className={cn('object-cover aspect-square')}
//               />
//             </div>
//             <Flex className='flex-col'>
//               <Body className='text-raisin-black font-medium leading-none'>
//               {truncateText(contractUri?.name || '', 30)}

//               </Body>
//               <BodySmall className='text-sonic-silver'>
//               {shortenAddress(contractUri?.creator)}
//               </BodySmall>
//             </Flex>
//           </Flex>
//         ))}
//       </div>
//     </Flex>
//   );
// }
