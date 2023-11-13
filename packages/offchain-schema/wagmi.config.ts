import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      project: '../river-contracts',
      include: [
        'Access_100_Types.json',
        'Publication_200_Types.json',
        'Channel_300_Types.json',
        'Message_Type.json',
        'RiverValidatorV1.json'
      ],
    }),
    foundry({
      project: '../river-contracts/lib/imp',
      forge: {
        build: true
      },
      include: [
        'NodeRegistry.json',
        'IdRegistry.json',
        'DelegateRegistry.json'
      ]
    }),
    foundry({
      project: '../river-contracts/lib/light-account',
      forge: {
        build: true
      },
      include: [
        'LightAccountFactory.json',
      ]
    })
  ],
  out: './abi/generated.ts',
})
