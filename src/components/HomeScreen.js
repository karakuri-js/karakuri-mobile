import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Drawer from 'react-native-drawer'

import { updateLocalPlaylist, updatePlayingContent, selectDirectory, selectGroup } from '../actions'

import HomeListView from './HomeListView'
import Menu from './Menu'
import HomeHeader from './HomeHeader'
import PlaylistStatusBar from './PlaylistStatusBar'

import { BROWSE_SONGS_SCREEN, SEARCH_SONGS_SCREEN, PLAYLIST_SCREEN } from '../constants/screens'

const handleTween = ratio => ({ main: { opacity: (2 - ratio) / 2 } })

export class HomeScreen extends Component {
  static propTypes = {
    directories: PropTypes.arrayOf(PropTypes.string).isRequired,
    directoryGroups: PropTypes.object.isRequired,
    playingContent: PropTypes.object,
    playlistContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
    selectDirectory: PropTypes.func.isRequired,
    selectedDirectoryName: PropTypes.string.isRequired,
    selectGroup: PropTypes.func.isRequired,
  }

  static defaultProps = {
    playingContent: null,
  }

  onDirectorySelect = selectedDirectoryName => {
    this.menuDrawer.close()
    this.props.selectDirectory(selectedDirectoryName)
  }

  onGroupSelect = groupName => {
    this.menuDrawer.close()
    this.props.selectGroup(groupName)
    this.props.navigation.navigate(BROWSE_SONGS_SCREEN)
  }

  openSearch = () => {
    this.menuDrawer.close()
    this.props.navigation.navigate(SEARCH_SONGS_SCREEN)
  }

  openMenu = () => {
    this.menuDrawer.open()
  }

  setMenuDrawerRef = ref => (this.menuDrawer = ref)

  showPlaylist = () => this.props.navigation.navigate(PLAYLIST_SCREEN)

  renderMenu() {
    return <Menu directories={this.props.directories} onDirectorySelect={this.onDirectorySelect} />
  }

  render() {
    const { directoryGroups, selectedDirectoryName, playingContent, playlistContents } = this.props
    return (
      <Drawer
        ref={this.setMenuDrawerRef}
        side="left"
        type="overlay"
        content={this.renderMenu()}
        negotiatePan
        panOpenMask={0.25}
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        closedDrawerOffset={-3}
        tapToClose
        tweenHandler={handleTween}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
          main: { paddingLeft: 3 },
        }}
      >
        <HomeHeader
          openMenu={this.openMenu}
          openSearch={this.openSearch}
          title={selectedDirectoryName}
        />
        <HomeListView
          groups={directoryGroups}
          directoryName={selectedDirectoryName}
          onGroupSelect={this.onGroupSelect}
        />
        {playingContent && (
          <PlaylistStatusBar
            {...playingContent}
            contentsCount={playlistContents.length}
            onPress={this.showPlaylist}
          />
        )}
      </Drawer>
    )
  }
}

export default connect(({ contents, playlist }) => ({ ...contents, ...playlist }), {
  updateLocalPlaylist,
  updatePlayingContent,
  selectDirectory,
  selectGroup,
})(HomeScreen)
