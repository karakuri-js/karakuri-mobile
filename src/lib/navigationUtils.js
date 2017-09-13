import { mapProps } from 'recompose'

export const flattenNavigationParamsProps = mapProps(props => ({
  ...props,
  ...props.navigation.state.params,
}))
