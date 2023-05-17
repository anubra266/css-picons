import { CollectionIcon, CustomIconRecord, IconifyJSON } from '@css-picons/types'
import { validateIconSet } from '@iconify/utils'
import { resolveIconEntries } from './resolve-icon-entries'

export async function resolveCollectionObject(
  collectionData: CustomIconRecord,
  collectionName: string,
): Promise<CollectionIcon[]> {
  //* Check if it's Iconfiy iconsJSON
  if (isIconifyJSON(collectionData)) {
    return resolveIconEntries(collectionName, collectionData)
  }

  //* When it's a custom icon set
  return await Promise.all(
    Object.entries(collectionData).map(async ([icon, iconData]) => {
      return {
        collection: collectionName,
        icon,
        svg: typeof iconData === 'string' ? iconData : await iconData(),
      }
    }),
  )
}

const isIconifyJSON = (v: any): v is IconifyJSON => {
  try {
    const iconJSON = validateIconSet(v)
    return !!iconJSON
  } catch (error) {
    return false
  }
}
