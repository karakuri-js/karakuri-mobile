import { NavigationActions } from 'react-navigation'

export const toggleDrawer = () => (dispatch, getState) => {
  const { navigation } = getState()
  const isDrawerOpened = navigation.routes[navigation.index].routeName === 'DrawerOpen'
  return dispatch(
    NavigationActions.navigate({ routeName: isDrawerOpened ? 'DrawerClose' : 'DrawerOpen' }),
  )
}
