import React from 'react'
import { StackNavigator } from 'react-navigation'
import { flattenNavigationParamsProps } from './lib/navigationUtils'

import Connection from './components/Connection'
import ContentsList from './components/ContentsList'
import Home from './components/Home'
import FilterList from './components/FilterList'
import Playlist from './components/Playlist'

const AppNavigator = StackNavigator({
  Connection: { screen: Connection },
  Home: { screen: flattenNavigationParamsProps(Home) },
  ContentsList: { screen: flattenNavigationParamsProps(ContentsList) },
  FilterList: { screen: flattenNavigationParamsProps(FilterList) },
  Playlist: { screen: flattenNavigationParamsProps(Playlist) },
}, { headerMode: 'none' })

// onNavigationStateChange={null} desactivates the internal logger
// which makes a HUGE difference in performance.
export default () => <AppNavigator onNavigationStateChange={null} />
