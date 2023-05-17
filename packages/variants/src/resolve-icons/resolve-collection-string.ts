import { CollectionIcon } from '@css-picons/types'
import { resolveIconEntries } from './resolve-icon-entries'

export async function resolveCollectionString(
  collection: string,
  collectionName: string = collection,
): Promise<CollectionIcon[]> {
  try {
    const path = `@iconify-json/${collection}/icons.json`

    return resolveIconPath(collectionName, path)
  } catch (error) {
    try {
      const path = `@iconify/json/json/${collection}.json`

      return resolveIconPath(collectionName, path)
    } catch (error) {
      console.log(
        '\x1b[31m',
        `You provided ${collection} as an icon collection in your panda config. You must install the ${`@iconify-json/${collection}`} package or to get all icons; install the @iconify/json package`,
      )
      process.exit(1)
    }
  }
}

function resolveIconPath(collection: string, path: string) {
  const iconsJson = require(path)
  return resolveIconEntries(collection, iconsJson)
}
