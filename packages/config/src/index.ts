import { definePreset } from '@pandacss/dev'
import type { Preset } from '@pandacss/types'

import type { CssPiconsOptions } from '@css-picons/types'
import { getNameVariants } from '@css-picons/variants'

export const cssPicons = (options: CssPiconsOptions): Preset => {
  const { identifier = 'icon', jsx, extraStyles } = options

  const nameVariants = getNameVariants(options)

  return definePreset({
    theme: {
      recipes: {
        [identifier]: {
          name: 'icon',
          description: 'Icon style',
          jsx,
          base: {
            width: '1em',
            height: '1em',
            ...extraStyles,
          },
          variants: {
            name: nameVariants,
          },
          defaultVariants: {},
        },
      },
    },
  })
}

export default cssPicons
