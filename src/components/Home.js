import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Drawer from 'react-native-drawer'

import { updateLocalPlaylist, updatePlayingContent, selectDirectory, selectGroup } from '../actions'

import HomeListView from './HomeListView'
import Menu from './Menu'
import HomeHeader from './HomeHeader'
import PlaylistStatusBar from './PlaylistStatusBar'

const handleTween = ratio => ({ main: { opacity: (2 - ratio) / 2 } })

export class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
    contents: PropTypes.array,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }

  static defaultProps = {
    contents: [],
  }

  componentWillMount() {
    this.webSocketConnect()
  }

  onDirectorySelect = selectedDirectoryName => {
    this.menuDrawer.close()
    this.props.selectDirectory(selectedDirectoryName)
  };

  onGroupSelect = groupName => {
    this.menuDrawer.close()
    this.props.selectGroup(groupName)
    this.props.navigation.navigate('BrowseSongsScreen')
  };

  openSearch = () => {
    this.menuDrawer.close()
    this.props.navigation.navigate('SearchSongsScreen')
  };

  openMenu = () => {
    this.menuDrawer.open()
  };

  setMenuDrawerRef = ref => (this.menuDrawer = ref)

  showPlaylist = () => this.props.navigation.navigate('PlaylistScreen')

  webSocketConnect() {
    // TODO remove all this from this component
    const { hostname, port } = this.props
    const ws = new WebSocket(`ws://${hostname}:${port}`)
    ws.onmessage = ({ data }) => {
      if (!data) return
      const { type, payload } = JSON.parse(data)
      if (type === 'playlist') return this.props.updateLocalPlaylist(payload)
      if (type === 'playingContent') {
        return this.props.updatePlayingContent(payload)
      }
    }
    // Always try to reconnect if we've lost the connection
    ws.onclose = () => setTimeout(
      () => this.webSocketConnect(),
      10000,
    )
  }

  renderMenu() {
    return (
      <Menu
        directories={this.props.directories}
        onDirectorySelect={this.onDirectorySelect}
      />
    )
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
          drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
          main: { paddingLeft: 3 },
        }}
      >
        <HomeHeader
          openMenu={this.openMenu}
          openSearch={this.openSearch}
          title={selectedDirectoryName}
        />
        <HomeListView
          groups={this.props.groupsPerLettersAndDirectories[selectedDirectoryName]}
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

export default connect(
  ({ authentication, karaoke, playlist }) => ({ ...authentication, ...karaoke, ...playlist }),
  { updateLocalPlaylist, updatePlayingContent, selectDirectory, selectGroup },
)(Home)
