import React, { Component, PropTypes } from 'react'
import { ListView, StyleSheet, Text, TextInput, View } from 'react-native'

import { ContentRow } from './ContentRow'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInputContainer: {
    width: 300,
  },
  noFoundResults: {
    padding: 10,
  },
  noFoundResultsText: {
    color: '#FFF',
  },
})

export class FilterList extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    contents: PropTypes.array,
    title: PropTypes.string,
  }

  static defaultProps = { contents: [], title: '' }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.addToPlaylist.bind(this)
    this.state = { textFilter: '', filteredContents: [] }
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  addToPlaylist() {
    this.props.addToPlaylist()
  }

  render() {
    const textFilterRegExp = new RegExp(this.state.textFilter, 'i')
    const isLongEnoughFilter = this.state.textFilter.length >= 1
    const filteredContents = isLongEnoughFilter ? this.props.contents.filter(
      ({ fileName }) => fileName.toLowerCase().match(textFilterRegExp)
    ) : []
    const foundResults = filteredContents.length !== 0

    return (
      <View style={styles.container}>
        <View
          style={styles.searchContainer}
          elevation={10}
        >
          <View style={styles.searchIcon}>
            <Text>🔍</Text>
          </View>
          <View style={styles.searchInputContainer}>
            <TextInput
              onChangeText={textFilter => this.setState({ textFilter })}
              placeholder="Search..."
              value={this.state.text}
            />
          </View>
        </View>
        {!foundResults && isLongEnoughFilter && (
          <View style={styles.noFoundResults}>
            <Text style={styles.noFoundResultsText}>No results :(</Text>
          </View>
        )}
        {foundResults && (
          <ListView
            dataSource={this.dataSource.cloneWithRows(filteredContents)}
            renderRow={
              content => <ContentRow {...content} addToPlaylist={this.props.addToPlaylist} />
            }
          />
        )}
      </View>
    )
  }
}
