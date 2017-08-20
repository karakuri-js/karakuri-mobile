import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AlphabetListView from 'react-native-alphabetlistview'

import { selectDirectory, selectGroup } from '../actions'

import GroupRow from './GroupRow'
import Menu from './Menu'

import { BROWSE_SONGS_SCREEN, PLAYLIST_SCREEN } from '../constants/screens'

const nullFn = () => null

const alphabetListStyles = {
  width: 40,
}

export class BrowseGroupsScreen extends Component {
  static propTypes = {
    directories: PropTypes.arrayOf(PropTypes.string).isRequired,
    directoryGroups: PropTypes.object.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
    selectDirectory: PropTypes.func.isRequired,
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
    return (
      <AlphabetListView
        data={this.props.directoryGroups}
        cell={GroupRow}
        cellHeight={50}
        cellProps={{ onPress: this.onGroupSelect }}
        pageSize={5}
        sectionHeader={nullFn}
        sectionHeaderHeight={0}
        sectionListStyle={alphabetListStyles}
      />
    )
  }
}

export default connect(({ contents }) => ({ ...contents }), {
  selectDirectory,
  selectGroup,
})(BrowseGroupsScreen)
