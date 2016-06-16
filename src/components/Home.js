import React, { Component, PropTypes } from 'react'
import { ToastAndroid } from 'react-native'
import Drawer from 'react-native-drawer'
import { uniq } from 'lodash'

import { getContentsPerDirectories, getContentsPerGroups } from '../lib/contentsFormatter'

import { ContentsList } from './ContentsList'
import { HomeListView } from './HomeListView'
import { Menu } from './Menu'
import { HomeHeader } from './HomeHeader'

export class Home extends Component {
  static propTypes = {
    contents: PropTypes.array,
    url: PropTypes.string.isRequired,
  }

  static defaultProps = { contents: [] }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.addToPlaylist.bind(this)
    this.onDirectorySelect = this.onDirectorySelect.bind(this)
    this.onGroupSelect = this.onGroupSelect.bind(this)
    this.openMenu = this.openMenu.bind(this)
  }

  componentWillMount() {
    this.prepareContentsListViews(this.props.contents)
  }

  componentWillReceiveProps(nextProps) {
    // TODO check if the contents have changed before doing this
    this.prepareContentsListViews(nextProps.contents)
  }

  addToPlaylist(id) {
    fetch(`${this.props.url}/request`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ id }),
    }).then(response => response.json())
      .then(({ message }) => ToastAndroid.show(message, ToastAndroid.LONG))
      .catch(err => ToastAndroid.show(err.toString(), ToastAndroid.LONG))
  }

  onDirectorySelect(selectedDirectoryName) {
    this.menuDrawer.close()
    this.setState({ selectedDirectoryName })
  }

  onGroupSelect(selectedGroupName) {
    this.setState({ selectedGroupName })
    this.songDrawer.open()
  }

  openMenu() {
    this.menuDrawer.open()
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
    const { contentsPerGroups, selectedGroupName } = this.state

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
          title={selectedDirectoryName}
        />
        <Drawer
          ref={ref => (this.songDrawer = ref)}
          side="right"
          type="overlay"
          content={
            <ContentsList
              addToPlaylist={this.addToPlaylist}
              contents={contentsPerGroups[selectedGroupName]}
              title={selectedGroupName}
            />
          }
          acceptPan={false}
          panOpenMask={0}
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
          <HomeListView
            groups={this.state.groupsPerLettersAndDirectories[selectedDirectoryName]}
            directoryName={selectedDirectoryName}
            onGroupSelect={this.onGroupSelect}
          />
        </Drawer>
      </Drawer>
    )
  }
}
