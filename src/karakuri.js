import React from 'react'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { flattenNavigationParamsProps } from './lib/navigationUtils'

import * as screens from './constants/screens'

import ConnectionScreen from './components/ConnectionScreen'
import BrowseSongsScreen from './components/BrowseSongsScreen'
import MainScreen from './components/MainScreen'
import SearchSongsScreen from './components/SearchSongsScreen'

import configureStore from './store/configureStore'

const store = configureStore()

const AppNavigator = StackNavigator(
  {
    [screens.CONNECTION_SCREEN]: { screen: ConnectionScreen },
    [screens.MAIN_SCREEN_CONTAINER]: {
      screen: StackNavigator(
        {
          [screens.MAIN_SCREEN]: { screen: MainScreen },
          [screens.BROWSE_SONGS_SCREEN]: {
            screen: flattenNavigationParamsProps(BrowseSongsScreen),
          },
          [screens.SEARCH_SONGS_SCREEN]: {
            screen: flattenNavigationParamsProps(SearchSongsScreen),
          },
        },
        { headerMode: 'none' },
      ),
    },
  },
  { headerMode: 'none' },
)

// onNavigationStateChange={null} desactivates the internal logger
// which makes a HUGE difference in performance.
export default () =>
  <Provider store={store}>
    <AppNavigator onNavigationStateChange={null} />
  </Provider>
