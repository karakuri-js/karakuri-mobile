import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ListView, StyleSheet, Text, TextInput, View } from 'react-native'
import SortableList from 'react-native-sortable-list'

import ContentRow from './ContentRow'
import HeaderTitle from './HeaderTitle'
import fuzzySearch from '../lib/fuzzySearch'
import * as Colors from '../constants/colors'
import { addToPlaylist, toggleFavorite } from '../actions'
import { provideGoToContentScreen } from './goToContentScreenHOC'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.text,
    flex: 1,
  },
  searchContainer: {
    backgroundColor: Colors.text,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInputContainer: {
    flexGrow: 1,
  },
  searchInput: {
    color: Colors.primaryText,
  },
  noFoundResults: {
    padding: 10,
  },
  noFoundResultsText: {
    color: Colors.primaryText,
  },
})

export class ContentsList extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    contents: PropTypes.array,
    displaySearch: PropTypes.bool,
    isReorderable: PropTypes.bool,
    goToContentScreen: PropTypes.func.isRequired,
    hideGroups: PropTypes.bool,
    onReorder: PropTypes.func,
    showAddToPlaylist: PropTypes.bool,
    showToggleFavorites: PropTypes.bool,
    title: PropTypes.string,
    toggleFavorite: PropTypes.func.isRequired,
  }

  static defaultProps = {
    contents: [],
    displaySearch: false,
    favorites: {},
    hideGroups: false,
    isReorderable: false,
    onReorder: () => {},
    showAddToPlaylist: true,
    showToggleFavorites: true,
    title: '',
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
      showStar={this.props.showToggleFavorites}
      showPlus={this.props.showAddToPlaylist}
      onTitlePress={this.props.goToContentScreen}
      onPlusPress={this.props.addToPlaylist}
      onStarPress={this.props.toggleFavorite}
      withHandle={this.props.isReorderable}
    />
  )

  renderSortableRow = ({ data }) => this.renderRow(data)

  render() {
    const { contents, displaySearch, isReorderable, title } = this.props
    const isLongEnoughFilter = this.state.textFilter.length >= 1
    let filteredContents = contents
    if (isLongEnoughFilter && displaySearch) {
      const { result } = fuzzySearch(contents, this.state.textFilter, 'fileName')
      filteredContents = result
    }
    const foundResults = filteredContents.length !== 0

    const listComponent = isReorderable ? (
      <SortableList data={filteredContents} renderRow={this.renderSortableRow} />
    ) : (
      <ListView
        keyboardShouldPersistTaps="always"
        dataSource={this.dataSource.cloneWithRows(filteredContents)}
        renderRow={this.renderRow}
      />
    )

    return (
      <View style={styles.container}>
        {!!title && <HeaderTitle title={this.props.title} />}
        {displaySearch && (
          <View style={styles.searchContainer} elevation={10}>
            <View style={styles.searchInputContainer}>
              <TextInput
                autoFocus
                onChangeText={this.setTextFilter}
                placeholder="Search..."
                value={this.state.text}
                underlineColorAndroid="transparent"
                style={styles.searchInput}
                placeholderTextColor={Colors.secondaryText}
              />
            </View>
          </View>
        )}
        {!foundResults && (
          <View style={styles.noFoundResults}>
            <Text style={styles.noFoundResultsText}>No results :(</Text>
          </View>
        )}
        {foundResults && listComponent}
      </View>
    )
  }
}

export default connect(null, { addToPlaylist, toggleFavorite })(
  provideGoToContentScreen(ContentsList),
)
