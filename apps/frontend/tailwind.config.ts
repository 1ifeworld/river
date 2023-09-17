import type { Config } from 'tailwindcss'

import baseConfig from '@river/tailwind'

export default {
  content: [
    ...baseConfig.content,
    '../../packages/estuary/src/**/*.{ts,tsx}',
  ],
  presets: [baseConfig],
} satisfies Config
