import React from 'react'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { flattenNavigationParamsProps } from './lib/navigationUtils'

import Connection from './components/Connection'
import BrowseSongsScreen from './components/BrowseSongsScreen'
import Home from './components/Home'
import SearchSongsScreen from './components/SearchSongsScreen'
import Playlist from './components/Playlist'

import configureStore from './store/configureStore'

const store = configureStore()

const AppNavigator = StackNavigator({
  Connection: { screen: Connection },
  Home: { screen: Home },
  BrowseSongsScreen: { screen: flattenNavigationParamsProps(BrowseSongsScreen) },
  SearchSongsScreen: { screen: flattenNavigationParamsProps(SearchSongsScreen) },
  Playlist: { screen: flattenNavigationParamsProps(Playlist) },
}, { headerMode: 'none' })

// onNavigationStateChange={null} desactivates the internal logger
// which makes a HUGE difference in performance.
export default () => (
  <Provider store={store}>
    <AppNavigator onNavigationStateChange={null} />
  </Provider>
)
