import { ponder } from '@/generated'
import { slice, bytesToString, toBytes, decodeFunctionData, Hex, getAddress } from 'viem'
import { channelRegistryABI } from 'scrypt'

ponder.on('ChannelRegistry:NewChannel', async ({ event, context }) => {
  const {
    User,
    Channel,
    Txn,
  } = context.db
  const { sender, userId, channelId, pointer, logic } = event.args

  const { args } = decodeFunctionData({
    abi: channelRegistryABI,
    data: event.transaction.input
  })  

  if (!args || !args[1]) return // todo: make this beter?

  const channelInitData = args[1]
  const renderer = slice(channelInitData as Hex, 0, 20)
  const encodedString = slice(channelInitData as Hex, 20)

  await Channel.create({
    id: channelId,
    data: {
      createdTimestamp: event.block.timestamp,
      createdBy: userId,
      logic: logic,
      accessId: `${logic}/${event.transaction.to}/${channelId}`,
      pointer: pointer,
      renderer: getAddress(renderer),
      dataForUri: encodedString,    
      uri: bytesToString(toBytes(encodedString))
    }
  })

  // record every transaction that has entered the crud cycle
  const txnReceipt = await Txn.findUnique({ id: event.transaction.hash })
  if (!txnReceipt) {
    await Txn.create({ id: event.transaction.hash })
    console.log(
      'processing complete. processed txn hash: ',
      event.transaction.hash,
    )
  }
})