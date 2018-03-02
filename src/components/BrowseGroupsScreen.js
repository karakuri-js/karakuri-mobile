import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AlphabetFlatList from './AlphabetFlatList'

import { selectDirectory, selectGroup } from '../actions'
import { getDirectories, getCurrentDirectoryGroups } from '../selectors/contents'

import GroupRow from './GroupRow'
import DirectoryItem from './DirectoryItem'

import { BROWSE_SONGS_SCREEN, PLAYLIST_SCREEN } from '../constants/screens'
import * as Colors from '../constants/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.text,
  },
  directoriesContainer: {
    flex: 1,
    height: 50,
  },
  listview: {
    flex: 10,
  },
})

const getItemLayout = (data, index) => ({ length: 45, offset: 45 * index, index })

const keyExtractor = (item, index) => index.toString()

export class BrowseGroupsScreen extends Component {
  static propTypes = {
    directories: PropTypes.arrayOf(PropTypes.string).isRequired,
    directoryGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
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

  renderItem = item => <GroupRow item={item.item} onPress={this.onGroupSelect} />

  showPlaylist = () => this.props.navigation.navigate(PLAYLIST_SCREEN)

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal style={styles.directoriesContainer}>
          {this.props.directories.map(this.renderDirectory)}
        </ScrollView>
        <View style={styles.listview}>
          <AlphabetFlatList
            data={this.props.directoryGroups}
            getItemLayout={getItemLayout}
            keyExtractor={keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    directories: getDirectories(state),
    directoryGroups: getCurrentDirectoryGroups(state),
  }),
  {
    selectDirectory,
    selectGroup,
  },
)(BrowseGroupsScreen)
