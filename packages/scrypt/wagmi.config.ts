import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  plugins: [
    foundry({
      project: '../river-contracts',
      include: [
        'RiverValidatorV1.json',
        'Post.json',
        'Message.json',
        'Item.json',
        'PostGateway2.json'
      ],
    }),
    foundry({
      project: '../river-contracts/lib/river-contracts',
      include: ['IdRegistry.json'],
    }) 
  ],
  out: './abi/generated.ts',
})
