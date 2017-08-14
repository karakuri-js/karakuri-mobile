import React from 'react'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import * as screens from './constants/screens'

import ConnectionScreen from './components/ConnectionScreen'
import MainScreen from './components/MainScreen'

import configureStore from './store/configureStore'

const store = configureStore()

const AppNavigator = StackNavigator(
  {
    [screens.CONNECTION_SCREEN]: { screen: ConnectionScreen },
    [screens.MAIN_SCREEN]: { screen: MainScreen },
  },
  { headerMode: 'none' },
)

// onNavigationStateChange={null} desactivates the internal logger
// which makes a HUGE difference in performance.
export default () =>
  <Provider store={store}>
    <AppNavigator onNavigationStateChange={null} />
  </Provider>
