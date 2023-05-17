import { defineConfig } from '@pandacss/dev'
import { cssPicons } from '@css-picons/config'
import feIconsData from '@iconify-json/fe/icons.json'
import phIconsData from '@iconify-json/ph/icons.json'
import fs from 'node:fs/promises'
import fetch from 'node-fetch'

const iconPreset = cssPicons({
  collections: [
    'mdi',
    'cryptocurrency-color',
    [
      'custom',
      {
        circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
        vite: () => fs.readFile('./public/vite.svg', 'utf-8'),
      },
    ],
    [
      'solar',
      {
        'airbuds-outline': async () => {
          //* fetch icon svg from a remote server:
          // ! We use node-fetch package because we can't access the native fetch
          return await fetch('https://api.iconify.design/solar:airbuds-outline.svg?color=%23888888').then((res) =>
            res.text(),
          )
        },
      },
    ],
    ['fe', feIconsData],
    ['carbon', () => import('@iconify-json/carbon/icons.json').then((i) => i.default as any)],
    ['ph', () => phIconsData],
    [
      'circle-flags',
      async () => {
        //* fetch iconifyJson from a remote server:
        //! We use node-fetch package because we can't access the native fetch
        return await fetch('https://raw.githubusercontent.com/iconify/icon-sets/master/json/circle-flags.json').then(
          (res) => res.json(),
        )
      },
    ],
  ],

  transform(svg, collection, icon) {
    // ! Put a working sample
    // do not apply fill to this icons on this collection
    if (collection === 'circle-flags' && icon === 'ng') return svg
    return svg.replace(/#fff/, 'currentColor')
  },

  styles: {
    verticalAlign: 'middle',
    display: 'inline-block',
  },
})

export default defineConfig({
  presets: ['@pandacss/dev/presets', iconPreset],
  preflight: true,
  include: ['./src/**/*.{tsx,ts}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
})
