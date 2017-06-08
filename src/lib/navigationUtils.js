import { mapProps } from 'recompose'

export const flattenNavigationParamsProps = mapProps(props => ({ // eslint-disable-line
  ...props,
  ...props.navigation.state.params,
}))
