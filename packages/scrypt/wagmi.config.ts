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
      ],
    }),
    // foundry({
    //   project: '../river-contracts/lib/imp',
    //   include: ['IdRegistry.json', 'PostGateway.json'],
    // }),
    foundry({
      project: '../river-contracts/lib/river-contracts',
      include: [
        'IdRegistry.json', 
        'DelegateRegistry.json', 
        'ChannelRegistry.json', 
        'ItemRegistry.json', 
        'RoleBasedAccess.json', 
        'StringRenderer.json', 
        'NftRenderer.json', 
      ],
    }),    
  ],
  out: './abi/generated.ts',
})
