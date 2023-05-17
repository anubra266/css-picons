import { Collection, CollectionIcon } from '@css-picons/types'
import { resolveCollectionString } from './resolve-collection-string'
import { resolveCollectionObject } from './resolve-collection-object'
import { resolveCollectionFunction } from './resolve-collection-function'

export async function resolveIcons(collection: Collection): Promise<CollectionIcon[]> {
  if (typeof collection === 'string') {
    return await resolveCollectionString(collection)
  }

  const [collectionName, collectionData] = collection

  //* Handle collection strings
  if (typeof collectionData === 'string') {
    return await resolveCollectionString(collectionData, collectionName)
  }

  //* Handle functions
  if (isFunction(collectionData)) {
    return await resolveCollectionFunction(collectionData, collectionName)
  }

  //* Handle objects - iconifyJSON or customiconset
  return await resolveCollectionObject(collectionData, collectionName)
}

const isFunction = (v: any): v is Function => typeof v === 'function'
