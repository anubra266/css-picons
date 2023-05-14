import { getIconData } from '@iconify/utils'

type ResolvedIcon = (readonly [string, string, ReturnType<typeof getIconData> | null])[]

function resolveIconPath(collection: string, path: string) {
  const iconsJson = require(path)
  const collectionIconEntries = Object.keys(iconsJson.icons)
  return collectionIconEntries.map((icon) => {
    const iconData = getIconData(iconsJson, icon)
    return [collection, icon, iconData] as const
  })
}

export function resolveIcon(collection: string): ResolvedIcon {
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
}
