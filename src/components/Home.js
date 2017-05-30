import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, BackHandler, ToastAndroid } from 'react-native'
import Drawer from 'react-native-drawer'
import { uniq } from 'lodash'

import { getContentsPerDirectories, getContentsPerGroups } from '../lib/contentsFormatter'

import { ContentsList } from './ContentsList'
import { FilterList } from './FilterList'
import { HomeListView } from './HomeListView'
import { Menu } from './Menu'
import { HomeHeader } from './HomeHeader'
import { Playlist } from './Playlist'
import { PlaylistStatusBar } from './PlaylistStatusBar'

export class Home extends Component {
  static propTypes = {
    contents: PropTypes.array,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }

  static defaultProps = {
    contents: [],
  }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.addToPlaylist.bind(this)
    this.closeSongDrawer = this.closeSongDrawer.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleRandomize = this.handleRandomize.bind(this)
    this.onDirectorySelect = this.onDirectorySelect.bind(this)
    this.onGroupSelect = this.onGroupSelect.bind(this)
    this.openMenu = this.openMenu.bind(this)
    this.openSearch = this.openSearch.bind(this)
    this.onSongDrawerClose = this.onSongDrawerClose.bind(this)
    this.toggleShowPlaylist = this.toggleShowPlaylist.bind(this)

    this.state = {
      selectedGroupName: '',
      isSearchMode: false,
      isSongDrawerOpened: false,
      showPlaylist: false,
      playlistContents: [],
    }
  }

  componentWillMount() {
    this.prepareContentsListViews(this.props.contents)
    BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    this.webSocketConnect()
  }

  componentWillReceiveProps(nextProps) {
    // TODO check if the contents have changed before doing this
    this.prepareContentsListViews(nextProps.contents)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
  }

  addToPlaylist(id) {
    if (!this.state.isSearchMode) this.closeSongDrawer()
    const { username } = this.props
    fetch(`${this.props.url}/request`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ id, username }),
    }).then(response => response.json())
      .then(({ message }) => ToastAndroid.show(message, ToastAndroid.LONG))
      .catch(err => ToastAndroid.show(err.toString(), ToastAndroid.LONG))
  }

  closeSongDrawer() {
    this.songDrawer.close()
  }

  handleBack() {
    if (this.state.isSongDrawerOpened) {
      this.closeSongDrawer()
      return true
    }
    if (this.state.showPlaylist) {
      this.setState({ showPlaylist: false })
      return true
    }
    Alert.alert(
      'Warning',
      'This will exit.',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ]
    )
    return true
  }

  handleRandomize() {
    const { username } = this.props
    fetch(`${this.props.url}/randomize`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ username }),
    }).then(response => response.json())
      .then(({ message }) => ToastAndroid.show(message, ToastAndroid.SHORT))
      .catch(err => ToastAndroid.show(err.toString(), ToastAndroid.SHORT))
  }

  onDirectorySelect(selectedDirectoryName) {
    this.menuDrawer.close()
    this.setState({ selectedDirectoryName, isSongDrawerOpened: false })
  }

  onGroupSelect(selectedGroupName) {
    this.setState(
      { selectedGroupName, isSearchMode: false, isSongDrawerOpened: true },
      () => {
        this.menuDrawer.close()
        this.songDrawer.open()
      }
    )
  }

  openSearch() {
    this.setState(
      { isSearchMode: true, isSongDrawerOpened: true },
      () => {
        this.menuDrawer.close()
        this.songDrawer.open()
      }
    )
  }

  openMenu() {
    this.songDrawer.close()
    this.menuDrawer.open()
  }

  onSongDrawerClose() {
    this.setState({ isSongDrawerOpened: false, isSearchMode: false })
  }

  prepareContentsListViews(contents) {
    // Group contents per directory & groups, then create listview datasources
    const contentsPerDirectories = getContentsPerDirectories(contents)
    const contentsPerGroups = getContentsPerGroups(contents)
    const groupsPerLettersAndDirectories = Object.keys(contentsPerDirectories).reduce(
      (directoriesObj, dirName) => ({
        ...directoriesObj,
        [dirName]: contentsPerDirectories[dirName].map(content => content.group).reduce(
          (alphabetListObj, groupName) => {
            const letter = groupName[0].toUpperCase()
            return {
              ...alphabetListObj,
              [letter]: uniq((alphabetListObj[letter] || []).concat(groupName)),
            }
          },
          {}
        ),
      }),
      {}
    )
    this.setState({
      contentsPerDirectories,
      contentsPerGroups,
      groupsPerLettersAndDirectories,
    })
  }

  toggleShowPlaylist() {
    this.setState({ showPlaylist: !this.state.showPlaylist })
  }

  webSocketConnect() {
    const { hostname, port } = this.props
    const ws = new WebSocket(`ws://${hostname}:${port}`)
    ws.onmessage = ({ data }) => {
      if (!data) return
      const { type, payload } = JSON.parse(data)
      if (type === 'playlist') return this.setState({ playlistContents: payload })
      if (type === 'playingContent') {
        return this.setState({
          playingContent: payload,
          // Stop showing playlist if we do not have a playingContent
          showPlaylist: payload ? this.state.showPlaylist : false,
        })
      }
    }
    // Always try to reconnect if we've lost the connection
    ws.onclose = () => setTimeout(
      () => this.webSocketConnect(),
      10000
    )
  }

  renderMenu() {
    return (
      <Menu
        directories={Object.keys(this.state.contentsPerDirectories)}
        onDirectorySelect={this.onDirectorySelect}
      />
    )
  }

  render() {
    const selectedDirectoryName = this.state.selectedDirectoryName ||
      Object.keys(this.state.contentsPerDirectories)[0]
    const {
      contentsPerGroups,
      isSearchMode,
      isSongDrawerOpened,
      playingContent,
      playlistContents,
      selectedGroupName,
    } = this.state
    const { contents: allContents } = this.props
    const myPlaylistContents = playlistContents
      .filter(({ username }) => username === this.props.username)
      .filter(({ id }) => id !== (playingContent || {}).id)

    return (
      <Drawer
        ref={ref => (this.menuDrawer = ref)}
        side="left"
        type="overlay"
        content={this.renderMenu()}
        negotiatePan
        panOpenMask={0.25}
        openDrawerOffset={0.5}
        panCloseMask={0.5}
        closedDrawerOffset={-3}
        tapToClose
        tweenHandler={ratio => ({ main: { opacity: (2 - ratio) / 2 } })}
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
        <Drawer
          ref={ref => (this.songDrawer = ref)}
          side="right"
          type={isSearchMode ? 'displace' : 'overlay'}
          content={
            isSongDrawerOpened && (isSearchMode ?
              <FilterList
                onSelect={this.addToPlaylist}
                contents={allContents}
              /> :
              <ContentsList
                contents={contentsPerGroups[selectedGroupName]}
                hideGroups
                onSelect={this.addToPlaylist}
                title={selectedGroupName}
              />
            )
          }
          onClose={this.onSongDrawerClose}
          acceptPan={false}
          captureGestures={isSearchMode ? false : 'open'}
          panOpenMask={0}
          openDrawerOffset={isSearchMode ? 1 : 0.5}
          panCloseMask={0.5}
          closedDrawerOffset={-3}
          tapToClose={!isSearchMode}
          tweenHandler={ratio => ({ main: { opacity: (2 - ratio) / 2 } })}
          styles={{
            drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
            main: { paddingLeft: 3 },
          }}
        >
          {!this.state.showPlaylist ? (
            <HomeListView
              groups={this.state.groupsPerLettersAndDirectories[selectedDirectoryName]}
              directoryName={selectedDirectoryName}
              onGroupSelect={this.onGroupSelect}
            />
          ) : (
            <Playlist
              contents={myPlaylistContents}
              handleRandomize={this.handleRandomize}
            />
          )}
        </Drawer>
        {playingContent && (
          <PlaylistStatusBar
            {...playingContent}
            contentsCount={playlistContents.length}
            onPress={this.toggleShowPlaylist}
          />
        )}
      </Drawer>
    )
  }
}
