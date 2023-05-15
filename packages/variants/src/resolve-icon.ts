import { getIconData } from '@iconify/utils'
import { Collection } from '@css-picons/types'
import { createSvg } from './create-svg'

type ResolvedIcon = (readonly [string, string, string | null])[]

function resolveIconPath(collection: string, path: string) {
  const iconsJson = require(path)
  return resolveIconEntries(collection, iconsJson)
}

function resolveIconEntries(collection: string, iconObj: any) {
  const collectionIconEntries = Object.keys(iconObj.icons)
  return collectionIconEntries.map((icon) => {
    const iconData = getIconData(iconObj, icon)
    const svg = iconData ? createSvg(iconData) : null
    return [collection, icon, svg] as const
  })
}

export function resolveIcon(collection: Collection): ResolvedIcon {
  if (typeof collection === 'string') {
    try {
      const path = `@iconify-json/${collection}/icons.json`

      return resolveIconPath(collection, path)
    } catch (error) {
      try {
        const path = `@iconify/json/json/${collection}.json`

        return resolveIconPath(collection, path)
      } catch (error) {
        console.log(
          '\x1b[31m',
          `You provided ${collection} as an icon collection in your panda config. You must install the ${`@iconify-json/${collection}`} package or to get all icons; install the @iconify/json package`,
        )
        process.exit(1)
      }
    }
  } else {
    const [collectionName, collectionData] = collection

    //* When we have { icon: svgString }
    return Object.entries(collectionData).map(([icon, svg]) => [collectionName, icon, svg])
  }
}
