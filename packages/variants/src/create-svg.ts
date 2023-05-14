import { IconifyIcon, iconToSVG, replaceIDs } from '@iconify/utils'

export function createSvg(iconData: IconifyIcon) {
  const svgData = iconToSVG(iconData)
  const svgAttributes: Record<string, string> = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    ...svgData.attributes,
  }

  const svgAttributesStr = Object.keys(svgAttributes)
    .map(
      (attr) =>
        // No need to check attributes for special characters, such as quotes,
        // they cannot contain anything that needs escaping.
        `${attr}="${svgAttributes[attr as keyof typeof svgAttributes]}"`,
    )
    .join(' ')

  const svg = `<svg ${svgAttributesStr}>${replaceIDs(svgData.body)}</svg>`

  return svg
}
