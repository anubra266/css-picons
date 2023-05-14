import { css, cx } from '../styled-system/css'
import { stack } from '../styled-system/patterns'
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
      <Icon name="cryptocurrency-color:aave" />
      <Icon name="mdi:account-alert-outline" />
      <Icon name="mdi:alpha-e" color="red.400" />
    </div>
  )
}

export default App
