import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AlphabetListView from 'react-native-alphabetlistview'

import { selectDirectory, selectGroup } from '../actions'
import { getDirectories, getCurrentDirectoryGroupsPerLetter } from '../selectors/contents'

import GroupRow from './GroupRow'
import DirectoryItem from './DirectoryItem'

import { BROWSE_SONGS_SCREEN, PLAYLIST_SCREEN } from '../constants/screens'

const nullFn = () => null

const alphabetListStyles = {
  width: 40,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  directoriesContainer: {
    flex: 1,
    height: 50,
  },
  listview: {
    flex: 10,
  },
})

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

  renderDirectory = directory => (
    <DirectoryItem key={directory} directory={directory} onPress={this.onDirectorySelect} />
  )

  showPlaylist = () => this.props.navigation.navigate(PLAYLIST_SCREEN)

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal style={styles.directoriesContainer}>
          {this.props.directories.map(this.renderDirectory)}
        </ScrollView>
        <AlphabetListView
          data={this.props.directoryGroups}
          cell={GroupRow}
          cellHeight={50}
          cellProps={{ onPress: this.onGroupSelect }}
          pageSize={5}
          sectionHeader={nullFn}
          sectionHeaderHeight={0}
          sectionListStyle={alphabetListStyles}
          style={styles.listview}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
    directories: getDirectories(state),
    directoryGroups: getCurrentDirectoryGroupsPerLetter(state),
  }),
  {
    selectDirectory,
    selectGroup,
  },
)(BrowseGroupsScreen)
