import { CollectionIcon, IconifyJSON } from '@css-picons/types'
import { getIconData } from '@iconify/utils'
import { createSvg } from '../create-svg'

export function resolveIconEntries(collectionName: string, iconObj: IconifyJSON): CollectionIcon[] {
  const collectionIconEntries = Object.keys(iconObj.icons)
  return collectionIconEntries.map((icon) => {
    const iconData = getIconData(iconObj, icon)
    const svg = iconData ? createSvg(iconData) : null
    return { collection: collectionName, icon, svg }
  })
}
