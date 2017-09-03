import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { routesInDrawer } from '../navigation/MainNavigator'

import DrawerItem from './DrawerItem'

const styles = {
  container: {
    paddingTop: 20,
  },
}

class DrawerMenu extends Component {
  static propTypes = {
    reset: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  }

  navigate = screen => {
    if (screen === routesInDrawer[0].id) {
      return this.props.reset({
        index: 0,
        actions: [this.props.navigate({ routeName: routesInDrawer[0].id })],
      })
    }
    this.props.reset({
      index: 1,
      actions: [
        this.props.navigate({ routeName: routesInDrawer[0].id }),
        this.props.navigate({ routeName: screen }),
      ],
    })
  }

  render() {
    const { navigation: { state: navigationState } } = this.props
    // Getting the first route of the drawerNavigator (only one), then the route of the StackNavigator
    const drawerStackedRoutes = navigationState.routes[navigationState.index]
    const focusedDrawerRouteName = drawerStackedRoutes.routes[drawerStackedRoutes.index].routeName

    return (
      <View style={styles.container}>
        {routesInDrawer.map(routeInDrawer => (
          <DrawerItem
            key={routeInDrawer.id}
            label={routeInDrawer.drawerTitle}
            id={routeInDrawer.id}
            onPress={this.navigate}
            isFocused={focusedDrawerRouteName === routeInDrawer.id}
          />
        ))}
      </View>
    )
  }
}

export default connect(null, {
  reset: NavigationActions.reset,
  navigate: NavigationActions.navigate,
})(DrawerMenu)
