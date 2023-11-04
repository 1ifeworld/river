import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      project: '../../packages/river-contracts',
      include: [
        'AdminWithMembers.json',
        'ChannelMessageTypes.json',
        'NodeRegistryTypes.json',
        'PublicationMessageTypes.json',
      ],
    }),
  ],
  out: './abi/generated.ts',
})

