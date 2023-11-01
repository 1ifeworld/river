import { ponder } from '@/generated'

const decodeRegisterSchema = (data: any) => {}

ponder.on('NodeRegistry:RegisterSchema', async ({ event, context }) => {
  const { Schema } = context.entities

  const { sender, schema, data } = event.params

  await Schema.create({
    // chainId // nodeRegistry address // bytes schema
    id: `${420}/${event.transaction.from}/${schema}/`,
    data: { sender: sender, schema: schema, data: data },
  })
})
