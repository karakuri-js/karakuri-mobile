import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, BackHandler, ToastAndroid } from 'react-native'
import Drawer from 'react-native-drawer'
import { uniq } from 'lodash'

import { getContentsPerDirectories, getContentsPerGroups } from '../lib/contentsFormatter'

import HomeListView from './HomeListView'
import Menu from './Menu'
import HomeHeader from './HomeHeader'
import PlaylistStatusBar from './PlaylistStatusBar'

const handleTween = ratio => ({ main: { opacity: (2 - ratio) / 2 } })

export default class Home extends Component {
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

  constructor(props) {
    super(props)

    this.state = {
      selectedGroupName: '',
      playlistContents: [],
    }
  }

  componentWillMount() {
    const { contents } = this.props
    this.prepareContentsListViews(contents)
    // BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    this.webSocketConnect()
  }

  componentWillReceiveProps(nextProps) {
    // TODO check if the contents have changed before doing this
    this.prepareContentsListViews(nextProps.contents)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
  }

  addToPlaylist = id => {
    const { url, username } = this.props
    fetch(`${url}/request`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ id, username }),
    }).then(response => response.json())
      .then(({ message }) => ToastAndroid.show(message, ToastAndroid.LONG))
      .catch(err => ToastAndroid.show(err.toString(), ToastAndroid.LONG))
  };

  handleBack = () => {
    Alert.alert(
      'Warning',
      'This will exit.',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'OK', onPress: () => BackHandler.exitApp() },
      ],
    )
    return true
  };

  handleRandomize = () => {
    const { url, username } = this.props
    fetch(`${url}/randomize`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ username }),
    }).then(response => response.json())
      .then(({ message }) => ToastAndroid.show(message, ToastAndroid.SHORT))
      .catch(err => ToastAndroid.show(err.toString(), ToastAndroid.SHORT))
  };

  onDirectorySelect = selectedDirectoryName => {
    this.menuDrawer.close()
    this.setState({ selectedDirectoryName })
  };

  onGroupSelect = selectedGroupName => {
    this.menuDrawer.close()
    this.props.navigation.navigate('ContentsList', {
      contents: this.state.contentsPerGroups[selectedGroupName],
      hideGroups: true,
      onSelect: this.addToPlaylist,
      title: selectedGroupName,
    })
  };

  openSearch = () => {
    this.menuDrawer.close()
    this.props.navigation.navigate('FilterList', {
      onSelect: this.addToPlaylist,
      contents: this.props.contents,
    })
  };

  openMenu = () => {
    this.menuDrawer.open()
  };

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
          {},
        ),
      }),
      {},
    )
    this.setState({
      contentsPerDirectories,
      contentsPerGroups,
      groupsPerLettersAndDirectories,
    })
  }

  setMenuDrawerRef = ref => (this.menuDrawer = ref)

  showPlaylist = () => {
    const { playingContent, playlistContents } = this.state
    const { navigation: { navigate }, username: myUsername } = this.props
    const myPlaylistContents = playlistContents
    .filter(({ username }) => username === myUsername)
    .filter(({ id }) => id !== (playingContent || {}).id)

    navigate('Playlist', {
      contents: myPlaylistContents,
      handleRandomize: this.handleRandomize,
    })
  };

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
        })
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
        directories={Object.keys(this.state.contentsPerDirectories)}
        onDirectorySelect={this.onDirectorySelect}
      />
    )
  }

  render() {
    const selectedDirectoryName = this.state.selectedDirectoryName ||
      Object.keys(this.state.contentsPerDirectories)[0]
    const { playingContent, playlistContents } = this.state
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
          groups={this.state.groupsPerLettersAndDirectories[selectedDirectoryName]}
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
