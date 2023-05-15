import type { CssPiconsOptions } from '@css-picons/types'
import { encodeSvgForCss } from '@iconify/utils'
import { resolveIcon } from './resolve-icon'

export const getNameVariants = ({ collections, mode = 'auto' }: CssPiconsOptions) => {
  return collections.flatMap(resolveIcon).reduce((acc, nxt) => {
    if (!nxt[2]) return { ...acc }

    const name = `${nxt[0]}:${nxt[1]}` as string
    const maskModeName = `${name}?mask`
    const bgModeName = `${name}?bg`

    const { styles, maskStyles, backgroundStyles } = buildVariants(nxt[2], mode)

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
