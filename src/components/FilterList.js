import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, StyleSheet, Text, TextInput, View } from 'react-native'

import { ContentRow } from './ContentRow'
import fuzzySearch from '../lib/fuzzySearch'

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
    contents: PropTypes.array,
    onSelect: PropTypes.func,
    title: PropTypes.string,
  }

  static defaultProps = { contents: [], title: '' }

  constructor(props) {
    super(props)
    this.state = { textFilter: '', filteredContents: [] }
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  render() {
    const { contents } = this.props
    const isLongEnoughFilter = this.state.textFilter.length >= 1
    let filteredContents = []
    if (isLongEnoughFilter) {
      const { result } = fuzzySearch(contents, this.state.textFilter, 'fileName')
      filteredContents = result
    }
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
              autoFocus
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
            keyboardShouldPersistTaps="always"
            dataSource={this.dataSource.cloneWithRows(filteredContents)}
            renderRow={
              content => <ContentRow {...content} onSelect={this.props.onSelect} />
            }
          />
        )}
      </View>
    )
  }
}
