import type { RecipeConfig, SystemStyleObject } from '@pandacss/types'
import type iconifyCollections from '@iconify/collections/collections.json'

export type CustomCollection = Record<string, `<svg${string}</svg>`>
export type Collection = keyof typeof iconifyCollections | [string, CustomCollection]

export interface CssPiconsOptions {
  /**
   * The jsx elements to track that consumes the exposed recipe.
   *
   * @default Icon
   */
  jsx?: RecipeConfig<any>['jsx']
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
  extraStyles?: SystemStyleObject
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
}
