import type { RecipeConfig, SystemStyleObject } from '@pandacss/types'
import type iconifyCollections from '@iconify/collections/collections.json'
import type { Preset as PandaPreset } from '@pandacss/types'
import type { IconifyJSON } from '@iconify/types'

export { IconifyJSON }

export type Preset = Pick<PandaPreset, 'theme'>

export type CollectionIcon = { collection: string; icon: string; svg: string | null }

type IconifyCollections = keyof typeof iconifyCollections

type CustomCollectionValue = string | (() => string) | (() => Promise<string>)
export type CustomIconRecord = Record<string, CustomCollectionValue> | IconifyJSON

type CustomIconFunctionReturn = IconifyCollections | CustomIconRecord
export type CustomIconFunction = () => CustomIconFunctionReturn | Promise<CustomIconFunctionReturn>

export type CustomCollection = IconifyCollections | CustomIconRecord | CustomIconFunction

export type Collection = IconifyCollections | [string, CustomCollection]

export interface CssPiconsOptions extends Omit<RecipeConfig<{}>, 'name' | 'description' | 'base'> {
  /**
   * The jsx elements to track that consumes the exposed recipe.
   *
   * @default Icon
   */
  jsx?: RecipeConfig<{}>['jsx']
  /**
   * The identifier for the exposed recipe
   *
   * @default icon
   */
  identifier?: string
  collections: Collection[]
  /**
   * Extra styles applied to the icons by default
   *
   * @default {}
   */
  styles?: SystemStyleObject
  /**
   * Mode of generated CSS icons.
   *
   * - `mask` - use background color and the `mask` property for monochrome icons
   * - `bg` - use background image for the icons, colors are static
   * - `auto` - smartly decide mode between `mask` and `background-img` per icon based on its style
   *
   * @default 'auto'
   * @see https://antfu.me/posts/icons-in-pure-css
   */
  mode?: 'mask' | 'bg' | 'auto'

  /**
   *
   * Transform method lets you transform icons when loading, for example adding fill attribute with currentColor
   * @param svg the svg string
   * @param collection collection name
   * @param icon icon name
   * @returns tranformed svg string
   *
   */
  transform?: (svg: string, collection: string, icon: string) => string
}
