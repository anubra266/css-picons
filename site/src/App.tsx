import { css, cx } from '../styled-system/css'
import { flex, stack } from '../styled-system/patterns'
import { icon, IconVariantProps } from '../styled-system/recipes'
import { SystemStyleObject } from '../styled-system/types'

type IconProps = IconVariantProps & SystemStyleObject
function Icon({ name, ...rest }: IconProps) {
  return (
    <span
      className={cx(
        icon({ name }),
        css({
          fontSize: '6xl',
          ...rest,
        }),
      )}
    />
  )
}

function App() {
  return (
    <div className={stack({ padding: '40px', align: 'stretch' })}>
      cryptocurrency-color:aave
      <Icon name="cryptocurrency-color:aave" />
      mdi:account-alert-outline
      <Icon name="mdi:account-alert-outline" />
      <span className={flex({ gap: 1 })}>
        mdi:alpha-e <i>(color: red.400)</i>
      </span>
      <Icon name="mdi:alpha-e" color="red.400" />
      custom:circle
      <Icon name="custom:circle" />
    </div>
  )
}

export default App
