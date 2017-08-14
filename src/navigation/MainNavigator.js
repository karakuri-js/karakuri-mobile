import React from 'react'
import { connect } from 'react-redux'
import { DrawerNavigator, addNavigationHelpers } from 'react-navigation'

import * as screens from '../constants/screens'
import { flattenNavigationParamsProps } from '../lib/navigationUtils'
import BrowseGroupsScreen from '../components/BrowseGroupsScreen'
import BrowseSongsScreen from '../components/BrowseSongsScreen'
import SearchSongsScreen from '../components/SearchSongsScreen'
import PlaylistScreen from '../components/PlaylistScreen'

export const MainNavigator = DrawerNavigator({
  [screens.BROWSE_GROUPS_SCREEN]: { screen: BrowseGroupsScreen },
  [screens.PLAYLIST_SCREEN]: { screen: flattenNavigationParamsProps(PlaylistScreen) },
  [screens.BROWSE_SONGS_SCREEN]: {
    screen: flattenNavigationParamsProps(BrowseSongsScreen),
  },
  [screens.SEARCH_SONGS_SCREEN]: {
    screen: flattenNavigationParamsProps(SearchSongsScreen),
  },
})

export const ConnectedMainNavigator = connect(({ navigation }) => ({
  navigation,
}))(({ navigation, dispatch }) =>
  <MainNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: navigation,
    })}
  />,
)