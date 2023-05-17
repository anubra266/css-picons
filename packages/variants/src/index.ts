import type { CssPiconsOptions } from '@css-picons/types'
import { encodeSvgForCss } from '@iconify/utils'
import { resolveIcons } from './resolve-icons'

export const getNameVariants = async ({ collections, transform, mode = 'auto' }: CssPiconsOptions) => {
  const collectionsMap = await Promise.all(collections.map(resolveIcons))
  return collectionsMap.flat().reduce((acc, nxt) => {
    if (!nxt.svg) return { ...acc }
    const name = `${nxt.collection}:${nxt.icon}` as string
    const maskModeName = `${name}?mask`
    const bgModeName = `${name}?bg`

    const svg = transform?.(nxt.svg, nxt.collection, nxt.icon) ?? nxt.svg
    const { styles, maskStyles, backgroundStyles } = buildVariants(svg, mode)

    return Object.assign(acc, {
      [name]: styles,
      [maskModeName]: maskStyles,
      [bgModeName]: backgroundStyles,
    })
  }, {})
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
