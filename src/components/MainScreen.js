import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { DrawerNavigator } from 'react-navigation'
import PropTypes from 'prop-types'

import * as screens from '../constants/screens'
import { flattenNavigationParamsProps } from '../lib/navigationUtils'

import HomeHeader from './HomeHeader'
import BrowseGroupsScreen from './BrowseGroupsScreen'
import PlaylistStatusBar from './PlaylistStatusBar'
import PlaylistScreen from './PlaylistScreen'

const DrawerScreens = DrawerNavigator({
  [screens.BROWSE_GROUPS_SCREEN]: { screen: BrowseGroupsScreen },
  [screens.PLAYLIST_SCREEN]: { screen: flattenNavigationParamsProps(PlaylistScreen) },
})

const styles = {
  container: {
    flex: 1,
  },
  drawerScreensContainer: {
    flex: 1,
  },
}

export class MainScreen extends Component {
  static propTypes = {
    playingContent: PropTypes.object,
    playlistContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
  }

  static defaultProps = {
    playingContent: null,
  }

  openDrawer = () => this.props.navigation.navigate('DrawerOpen')

  goToSearch = () => this.props.navigation.navigate(screens.SEARCH_SONGS_SCREEN)

  goToPlaylist = () => this.props.navigation.navigate(screens.PLAYLIST_SCREEN)

  render() {
    const { playingContent, playlistContents } = this.props
    return (
      <View style={styles.container}>
        <HomeHeader title="Karakuri" openMenu={this.openDrawer} openSearch={this.goToSearch} />
        <View style={styles.drawerScreensContainer}>
          <DrawerScreens />
        </View>
        {playingContent &&
          <PlaylistStatusBar
            {...playingContent}
            contentsCount={playlistContents.length}
            onPress={this.goToPlaylist}
          />}
      </View>
    )
  }
}

export default connect(({ playlist }) => ({ ...playlist }))(MainScreen)
