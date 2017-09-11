import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListView, StyleSheet, Text, TextInput, View } from 'react-native'

import ContentRow from './ContentRow'
import fuzzySearch from '../lib/fuzzySearch'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
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

export default class ContentsList extends Component {
  static propTypes = {
    contents: PropTypes.array,
    displaySearch: PropTypes.bool,
    hideGroups: PropTypes.bool,
    onSelect: PropTypes.func,
    showAddToPlaylist: PropTypes.bool,
    showToggleFavorites: PropTypes.bool,
    title: PropTypes.string,
    toggleFavorite: PropTypes.func,
  }

  static defaultProps = {
    contents: [],
    displaySearch: false,
    favorites: {},
    hideGroups: false,
    onSelect: () => {},
    showAddToPlaylist: true,
    showToggleFavorites: true,
    title: '',
    toggleFavorite: () => {},
  }

  constructor(props) {
    super(props)
    this.state = { textFilter: '', filteredContents: [] }
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
  }

  setTextFilter = textFilter => this.setState({ textFilter })

  renderRow = content => (
    <ContentRow
      {...content}
      hideGroup={this.props.hideGroups}
      showStar={this.props.showAddToPlaylist}
      showPlus={this.props.showToggleFavorites}
      onPlusPress={this.props.onSelect}
      onStarPress={this.props.toggleFavorite}
    />
  )

  render() {
    const { contents, displaySearch, title } = this.props
    const isLongEnoughFilter = this.state.textFilter.length >= 1
    let filteredContents = contents
    if (isLongEnoughFilter && displaySearch) {
      const { result } = fuzzySearch(contents, this.state.textFilter, 'fileName')
      filteredContents = result
    }
    const foundResults = filteredContents.length !== 0

    return (
      <View style={styles.container}>
        {!!title && (
          <View style={styles.header} elevation={10}>
            <Text numberOfLines={1} style={styles.headerText}>
              {this.props.title}
            </Text>
          </View>
        )}
        {displaySearch && (
          <View style={styles.searchContainer} elevation={10}>
            <View style={styles.searchIcon}>
              <Text>🔍</Text>
            </View>
            <View style={styles.searchInputContainer}>
              <TextInput
                autoFocus
                onChangeText={this.setTextFilter}
                placeholder="Search..."
                value={this.state.text}
              />
            </View>
          </View>
        )}
        {!foundResults && (
          <View style={styles.noFoundResults}>
            <Text style={styles.noFoundResultsText}>No results :(</Text>
          </View>
        )}
        {foundResults && (
          <ListView
            keyboardShouldPersistTaps="always"
            dataSource={this.dataSource.cloneWithRows(filteredContents)}
            renderRow={this.renderRow}
          />
        )}
      </View>
    )
  }
}
