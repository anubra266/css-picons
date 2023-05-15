<div align="center">
  <h1>
    <br/>
    😌
    <br />
    css-picons
    <br />
    <br />
  </h1>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/@css-picons/config?style=for-the-badge">
       <img src="https://img.shields.io/npm/v/@css-picons/config.svg?style=for-the-badge" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@css-picons/config?style=for-the-badge">
      <img src="https://img.shields.io/npm/dw/@css-picons/config.svg?style=for-the-badge" alt="npm  downloads" />
    </a>
<a>
    <img alt="NPM" src="https://img.shields.io/npm/l/@css-picons/config?style=for-the-badge">
</a>

<a>
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/anubra266/css-picons?logo=github&style=for-the-badge">
</a>
    <br />
    <br />
  <sup>
Use any icons with Pure CSS in CSS Panda
  </sup>
  <br />
  <br />

</div>

## About

Use any icons with Pure CSS in [CSS Panda](https://github.com/chakra-ui/panda). 'Twas Inspired by
[@unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons/)

## Install

```sh
npm i -D @css-picons/config @iconify-json/[the-collection-you-want]
```

We use [Iconify](https://iconify.design) as our data source of icons. You need to install the corresponding iconset in
`devDependencies` by following the `@iconify-json/*` pattern. For example, `@iconify-json/mdi` for
[Material Design Icons](https://materialdesignicons.com/), `@iconify-json/tabler` for
[Tabler](https://tabler-icons.io/). You can refer to [Icônes](https://icones.js.org/) or
[Iconify](https://icon-sets.iconify.design/) for all the collections available.

If you prefer to install the all the icon sets available on Iconify at once (~130MB):

```bash
npm i -D @iconify/json
```

> Even if you do this, only the ones used in your code will be packaged by panda. That's nice.

## Configuration

In your `panda.config.*` file, import `cssPicons` from `@css-picons/config`, then add it to presets

```ts
import { cssPicons } from '@css-picons/config'
export default defineConfig({
  presets: [
    // ...
    cssPicons({
      // Specify all the icon sets you'll be using
      collections: ['mdi'],
    }),
  ],
})
```

Then make sure your `theme` is extendable, if you have configured it.

```js
// panda.config.*
export default defineConfig({
  //...
  theme: {
    extend: {
      // ...
    },
  },
})
```

## Usage

Now you can use it in your components in all the ways `css-panda` allows through the `icon` recipe which is exported
from your design system. The icon name follows the format `<collection>:<name>`

```js
import { icon } from '../panda/recipes'
return (
  <div
    className={cx(
      icon({ name: 'mdi:emoticon-happy' }),
      css({
        color: 'yellow.500',
        fontSize: '6xl',
      }),
    )}
  />
)
```

**Result**:

<img src="data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='1em'%20height='1em'%20viewBox='0%200%2024%2024'%3E%3Cpath%20fill='yellow'%20d='M12%202A10%2010%200%200%200%202%2012a10%2010%200%200%200%2010%2010a10%2010%200%200%200%2010-10A10%2010%200%200%200%2012%202M7%209.5C7%208.7%207.7%208%208.5%208s1.5.7%201.5%201.5S9.3%2011%208.5%2011S7%2010.3%207%209.5m5%207.73c-1.75%200-3.29-.73-4.19-1.81L9.23%2014c.45.72%201.52%201.23%202.77%201.23s2.32-.51%202.77-1.23l1.42%201.42c-.9%201.08-2.44%201.81-4.19%201.81M15.5%2011c-.8%200-1.5-.7-1.5-1.5S14.7%208%2015.5%208s1.5.7%201.5%201.5s-.7%201.5-1.5%201.5Z'/%3E%3C/svg%3E" height="60px"></img>

#### Usage in other ways

```js
// A basic anchor icon from Phosphor icons
const className = icon({ name: 'ph:anchor-simple-thin' })
// An orange alarm from Material Design Icons
const className = cx(icon({ name: 'mdi:alarm' }), css({ color: 'orange.400' }))
// A large react logo
const className = cx(icon({ name: 'logos:react' }), css({ fontSize: '3xl' }))
// Sun in light mode, Moon in dark mode, from Carbon
const className = icon({ name: { base: 'carbon:sun', _dark: 'carbon:moon' } })
// Twemoji of laugh, turns to tear on hovering
const className = icon({
  name: {
    base: 'twemoji:grinning-face-with-smiling-eyes',
    _hover: 'twemoji:face-with-tears-of-joy',
  },
})
```

### JSX

When using in `jsx` you might want to use it in a reusable component, in such cases you have to tell `css-panda` the
name of the component so it can watch it when generating styles. An example:

```js
function AppIcon(props: IconVariants) {
  return (
    <div
      className={cx(
        icon(props),
        css({
          fontSize: '6xl',
        }),
      )}
    />
  )
}
// Somewhere else
return <AppIcon name="mdi:emoticon-happy" />
```

You tell `panda` to watch the external component by using the `jsx` key in the config.

```ts
import { cssPicons } from '@css-picons/config'
export default defineConfig({
  presets: [
    // ...
    cssPicons({
      // ...
      jsx: 'AppIcon',
    }),
  ],
})
```

**Note:** Panda automatically tracks components named as the capitalized version of the identifier. e.g. If your
identifier is daocons, a component called `Daocons` that consumes it will be automatically tracked. In this case, we
automatically track components named `Icon`.

### Identifier

By default, you export `icon` from recipes which is then consumed to render the icons. But you can change this in the
config with the `identifier` key.

```ts
import { cssPicons } from '@css-picons/config'
export default defineConfig({
  presets: [
    // ...
    cssPicons({
      // ...
      identifier: 'cssIcon',
    }),
  ],
})
```

Then export and use the new identifier in your project instead.

```js
import { cssIcon } from '../panda/recipes'
return (
  <div
    className={cx(
      cssIcon({ name: 'mdi:emoticon-happy' }),
      css({
        color: 'yellow.500',
        fontSize: '6xl',
      }),
    )}
  />
)
```

### Extra Styles

You can provide extra styles to control the default behavior of the icons. You could make icons vertically aligned and
inline by default by the following example:

```ts
import { cssPicons } from '@css-picons/config'
export default defineConfig({
  presets: [
    // ...
    cssPicons({
      // ...
      styles: {
        verticalAlign: 'middle',
        display: 'inline-block',
      },
    }),
  ],
})
```

### Modes Overriding

By default, `css-picons` will choose the rendering modes automatically for each icon based on the icons'
characteristics. You can read more in this [blog post](https://antfu.me/posts/icons-in-pure-css). In some cases, you may
want to explicitly set the rendering modes for each icon.

- `?bg` for `background-img` - renders the icon as a background image
- `?mask` for `mask` - renders the icon as a mask image

For example, `vscode-icons:file-type-light-pnpm`, an icon with colors (the `svg` doesn't contain `currentColor`) that
will be rendered as a background image. Use `vscode-icons:file-type-light-pnpm?mask` to render it as a mask image and
bypass it's colors.

#### Default mode

You can also set the default mode in your config with the `mode` key. It's `auto` by default which means `css-picons`
automatically selects a mode based on it's perception of the icon.

```ts
export default defineConfig({
  presets: [
    // ...
    cssPicons({
      // ...
      mode: 'mask',
    }),
  ],
})
```

### Custom collections

You can also provide your own custom collections by passing a tuple whose first item is the collection name, and the
second is the collection icons.

```ts
export default defineConfig({
  presets: [
    // ...
    cssPicons({
      // ...
      collections: [
        // ...
        'custom',
        {
          circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
        },
      ],
    }),
  ],
})
```

Then use it through the `custom` icon name.

```js
import { icon } from '../panda/recipes'
return <div className={icon({ name: 'custom:circle' })} />
```

## TODO

Features to add and document

- [ ] Icon customizations -
      [guide](https://github.com/unocss/unocss/tree/main/packages/preset-icons/#icon-customizations)
- [ ] Fetching from CDN - [guide](https://github.com/unocss/unocss/tree/main/packages/preset-icons/#cdn)
