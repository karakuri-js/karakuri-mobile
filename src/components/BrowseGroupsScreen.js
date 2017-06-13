import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { selectDirectory, selectGroup } from '../actions'

import HomeListView from './HomeListView'
import Menu from './Menu'

import { BROWSE_SONGS_SCREEN, SEARCH_SONGS_SCREEN, PLAYLIST_SCREEN } from '../constants/screens'

export class BrowseGroupsScreen extends Component {
  static propTypes = {
    directories: PropTypes.arrayOf(PropTypes.string).isRequired,
    directoryGroups: PropTypes.object.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
    selectDirectory: PropTypes.func.isRequired,
    selectedDirectoryName: PropTypes.string.isRequired,
    selectGroup: PropTypes.func.isRequired,
  }

  onDirectorySelect = selectedDirectoryName => this.props.selectDirectory(selectedDirectoryName)

  onGroupSelect = groupName => {
    this.props.selectGroup(groupName)
    this.props.navigation.navigate(BROWSE_SONGS_SCREEN)
  }

  showPlaylist = () => this.props.navigation.navigate(PLAYLIST_SCREEN)

  renderMenu = () =>
    <Menu directories={this.props.directories} onDirectorySelect={this.onDirectorySelect} />

  render() {
    const { directoryGroups, selectedDirectoryName } = this.props
    return (
      <HomeListView
        groups={directoryGroups}
        directoryName={selectedDirectoryName}
        onGroupSelect={this.onGroupSelect}
      />
    )
  }
}

export default connect(({ contents }) => ({ ...contents }), {
  selectDirectory,
  selectGroup,
})(BrowseGroupsScreen)
