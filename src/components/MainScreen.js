import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'

import * as screens from '../constants/screens'
import { toggleFavorite } from '../actions'
import { toggleDrawer } from '../actions/navigation'
import { ConnectedMainNavigator } from '../navigation/MainNavigator'
import { getAugmentedPlayingContent, getPlaylistContentsNumber } from '../selectors/contents'

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
    playlistContentsNumber: PropTypes.number.isRequired,
    navigate: PropTypes.func.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
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

  toggleFavoriteOnPlayingContent = () => this.props.toggleFavorite(this.props.playingContent.id)

  render() {
    const { playingContent, playlistContentsNumber } = this.props
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
            contentsCount={playlistContentsNumber}
            onPress={this.goToPlaylist}
            onStarPress={this.toggleFavoriteOnPlayingContent}
          />
        )}
      </View>
    )
  }
}

export default connect(
  state => ({
    playingContent: getAugmentedPlayingContent(state),
    playlistContentsNumber: getPlaylistContentsNumber(state),
  }),
  {
    back: NavigationActions.back,
    navigate: NavigationActions.navigate,
    toggleDrawer,
    toggleFavorite,
  },
)(MainScreen)
