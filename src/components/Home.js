import React, { Component, PropTypes } from 'react'
import Drawer from 'react-native-drawer'
import AlphabetListView from 'react-native-alphabetlistview'

import { getContentsPerDirectories, getContentsPerFirstLetters } from '../lib/contentsFormatter'

import { ContentRow } from './ContentRow'
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
    })
  }

  onDirectorySelect(selectedDirectoryName) {
    this.drawer.close()
    this.setState({ selectedDirectoryName })
  }

  openMenu() {
    this.drawer.open()
  }

  prepareContentsListViews(contents) {
    // Group contents per directory, then create listview datasources
    const contentsPerDirectories = getContentsPerDirectories(contents)
    const listViewsPerDirectories = Object.keys(contentsPerDirectories).reduce((obj, dirName) => ({
      ...obj,
      [dirName]: getContentsPerFirstLetters(contentsPerDirectories[dirName]),
    }), {})
    this.setState({ listViewsPerDirectories })
  }

  renderMenu() {
    return (
      <Menu
        directories={Object.keys(this.state.listViewsPerDirectories)}
        onDirectorySelect={this.onDirectorySelect}
      />
    )
  }

  render() {
    const selectedDirectoryName = this.state.selectedDirectoryName ||
      Object.keys(this.state.listViewsPerDirectories)[0]

    return (
      <Drawer
        ref={ref => (this.drawer = ref)}
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
        <AlphabetListView
          data={this.state.listViewsPerDirectories[selectedDirectoryName]}
          cell={ContentRow}
          cellHeight={100}
          cellProps={{ addToPlaylist: this.addToPlaylist }}
          pageSize={500}
          initialListSize={500}
          sectionHeaderHeight={22.5}
        />
      </Drawer>
    )
  }
}
