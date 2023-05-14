import { defineConfig } from '@pandacss/dev'
import { cssPicons } from '@css-picons/config'

export default defineConfig({
  presets: [
    '@pandacss/dev/presets',
    cssPicons({
      collections: ['mdi', 'cryptocurrency-color'],
      extraStyles: {
        verticalAlign: 'middle',
        display: 'inline-block',
      },
    }),
  ],
  preflight: true,
  include: ['./src/**/*.{tsx,ts}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
})
