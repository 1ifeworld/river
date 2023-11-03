import { ponder } from '@/generated'
import { isValidSchemaRegistration } from "offchain-schema";
import { decodeNodeRegistrationData } from "offchain-schema";

ponder.on('NodeRegistry:RegisterSchema', async ({ event, context }) => {
  const { Schema } = context.entities
  const { sender, schema, data } = event.params
  // check if schema registration evnet is valid. exit crud loop if not
    if (
      !isValidSchemaRegistration({ sender: sender, schema: schema, data: data })
    )
      return;

  // enter new schema in table
  await Schema.create({
    // chainId // keccak256(chainId, registryAddress, schemaCount)
    id: `420/${schema}`,
    data: {
      sender: sender,
      schema: schema,
      data: data,
    },
  })
})

ponder.on('NodeRegistry:RegisterNode', async ({ event, context }) => {
  const { Node } = context.entities
  const { sender, nodeId, data } = event.params

    const { userId, schema, regType, regBody } = decodeNodeRegistrationData({
      data: data,
    });

    // Node.findMany

  // if (!isValidUserId(userId)) return;
  // if (!isValidNodeSchema(schema)) return;
  // if (!isValidReg(regType, regBody)) return;
  // const { admin, members, uri } = processNodeRegistrationData(regType, regBody)
  // const { name, description, coverImage } = procesChannelUri(uri)

    await Node.create({
      id: `420/${nodeId}`,
      data: {
        sender: sender,
        nodeId: nodeId,
        userId: userId,
        schema: schema,
        regType: regType,
        regBody: regBody
      },
    });
})
