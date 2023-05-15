import type { CssPiconsOptions } from '@css-picons/types'
import { encodeSvgForCss } from '@iconify/utils'
import { createSvg } from './create-svg'
import { resolveIcon } from './resolve-icon'

export const getNameVariants = ({ collections, customCollection, mode = 'auto' }: CssPiconsOptions) => {
  const collectionVariants = collections.flatMap(resolveIcon).reduce((acc, nxt) => {
    if (!nxt[2]) return { ...acc }

    const svg = createSvg(nxt[2])

    const name = `${nxt[0]}:${nxt[1]}` as string
    const maskModeName = `${name}?mask`
    const bgModeName = `${name}?bg`

    const { styles, maskStyles, backgroundStyles } = buildVariants(svg, mode)

    return Object.assign(acc, {
      [name]: styles,
      [maskModeName]: maskStyles,
      [bgModeName]: backgroundStyles,
    })
  }, {})

  const customCollectionVariants = Object.entries(customCollection).reduce((acc, nxt) => {
    const name = `custom:${nxt[0]}` as string
    const maskModeName = `${name}?mask`
    const bgModeName = `${name}?bg`

    const { styles, maskStyles, backgroundStyles } = buildVariants(nxt[1], mode)

    return Object.assign(acc, {
      [name]: styles,
      [maskModeName]: maskStyles,
      [bgModeName]: backgroundStyles,
    })
  }, {})

  return Object.assign(collectionVariants, customCollectionVariants)
}

function buildVariants(svg: string, mode: CssPiconsOptions['mode']) {
  const uri = `url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`

  const _mode = mode === 'auto' ? (svg.includes('currentColor') ? 'mask' : 'bg') : mode

  const maskStyles = {
    mask: `${uri} no-repeat`,
    maskSize: '100% 100%',
    backgroundColor: 'currentColor',
    // for Safari https://github.com/elk-zone/elk/pull/264
    color: 'inherit',
  }

  const backgroundStyles = {
    background: `${uri} no-repeat`,
    backgroundSize: '100% 100%',
    backgroundColor: 'transparent',
  }

  const styles =
    _mode === 'mask'
      ? // monochrome
        maskStyles
      : // colored
        backgroundStyles

  return { styles, maskStyles, backgroundStyles }
}
