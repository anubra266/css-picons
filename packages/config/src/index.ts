import { definePreset } from '@pandacss/dev'
import type { Preset } from '@pandacss/types'

import type { CssPiconsOptions } from '@css-picons/types'
import { getNameVariants } from '@css-picons/variants'

export const cssPicons = (options: CssPiconsOptions): Preset => {
  const { identifier = 'icon', styles, variants: variantsConfig, ...rest } = options

  const nameVariants = getNameVariants(options)

  const base = Object.assign(
    {
      width: '1em',
      height: '1em',
    },
    styles,
  )

  const variants = Object.assign({}, variantsConfig, {
    name: nameVariants,
  })

  const recipe = Object.assign(
    {
      name: 'icon',
      description: 'Icon style',
      base,
      variants,
    },
    rest,
  )

  return definePreset({
    theme: {
      recipes: {
        [identifier]: recipe,
      },
    },
  })
}

export default cssPicons
