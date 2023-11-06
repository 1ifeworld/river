import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      project: '../river-contracts',
      include: [
        'AdminWithMembers.json',
        'ChannelMessageTypes.json',
        'NodeRegistryTypes.json',
        'PublicationMessageTypes.json',
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
    })
  ],
  out: './abi/generated.ts',
})
