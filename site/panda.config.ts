import { defineConfig } from '@pandacss/dev'
import { cssPicons } from '@css-picons/config'

export default defineConfig({
  presets: [
    '@pandacss/dev/presets',
    cssPicons({
      collections: [
        'mdi',
        'cryptocurrency-color',
        [
          'custom',
          {
            circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
          },
        ],
      ],
      styles: {
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
