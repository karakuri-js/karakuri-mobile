import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'

import * as screens from '../constants/screens'
import { toggleDrawer } from '../actions/navigation'
import { ConnectedMainNavigator } from '../navigation/MainNavigator'
import { getPlayingContent, getPlaylistContents } from '../selectors/contents'

import MainHeader from './MainHeader'
import PlaylistStatusBar from './PlaylistStatusBar'

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
    back: PropTypes.func.isRequired,
    playingContent: PropTypes.object,
    playlistContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigate: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }

  static defaultProps = {
    playingContent: null,
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
  }

  backHandler = () => this.props.back()

  goToSearch = () => this.props.navigate({ routeName: screens.SEARCH_SONGS_SCREEN })

  goToPlaylist = () => this.props.navigate({ routeName: screens.PLAYLIST_SCREEN })

  render() {
    const { playingContent, playlistContents } = this.props
    return (
      <View style={styles.container}>
        <MainHeader
          title="Karakuri"
          openMenu={this.props.toggleDrawer}
          openSearch={this.goToSearch}
        />
        <View style={styles.drawerScreensContainer}>
          <ConnectedMainNavigator />
        </View>
        {playingContent && (
          <PlaylistStatusBar
            {...playingContent}
            contentsCount={playlistContents.length}
            onPress={this.goToPlaylist}
          />
        )}
      </View>
    )
  }
}

export default connect(
  state => ({
    playingContent: getPlayingContent(state),
    playlistContents: getPlaylistContents(state),
  }),
  {
    back: NavigationActions.back,
    navigate: NavigationActions.navigate,
    toggleDrawer,
  },
)(MainScreen)
