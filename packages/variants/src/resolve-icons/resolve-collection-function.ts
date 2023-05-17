import { CollectionIcon, CustomIconFunction } from '@css-picons/types'
import { resolveCollectionString } from './resolve-collection-string'
import { resolveCollectionObject } from './resolve-collection-object'

export async function resolveCollectionFunction(
  collectionDataFunction: CustomIconFunction,
  collectionName: string,
): Promise<CollectionIcon[]> {
  const collectionData = await collectionDataFunction()

  if (typeof collectionData === 'string') {
    return await resolveCollectionString(collectionData, collectionName)
  }
  return await resolveCollectionObject(collectionData, collectionName)
}
