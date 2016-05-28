import React, { Component, PropTypes } from 'react'
import { ToastAndroid } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import AlphabetListView from 'react-native-alphabetlistview'
import { getContentsPerDirectories, getContentsPerFirstLetters } from '../lib/contentsFormatter'
import { ContentRow } from './ContentRow'

export class HomeTabs extends Component {
  static propTypes = {
    contents: PropTypes.array,
    url: PropTypes.string.isRequired,
  }

  static defaultProps = { contents: [] }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.addToPlaylist.bind(this)
    this.renderRow = this.renderRow.bind(this)
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

  prepareContentsListViews(contents) {
    // Group contents per directory, then create listview datasources
    const contentsPerDirectories = getContentsPerDirectories(contents)
    const listViewsPerDirectories = Object.keys(contentsPerDirectories).reduce((obj, dirName) => {
      return {
        ...obj,
        [dirName]: getContentsPerFirstLetters(contentsPerDirectories[dirName]),
      }
    }, {})
    this.setState({ listViewsPerDirectories })
  }

  renderRow(content) {
    return (
      <ContentRow
        content={content}
        addToPlaylist={this.addToPlaylist}
      />
    )
  }

  render() {
    return (
      <ScrollableTabView>
        {Object.keys(this.state.listViewsPerDirectories).map((dirName, dirNameKey) => (
          <AlphabetListView
            key={dirNameKey}
            data={this.state.listViewsPerDirectories[dirName]}
            cell={ContentRow}
            cellHeight={100}
            cellProps={{ addToPlaylist: this.addToPlaylist }}
            onEndReached={() => ToastAndroid.show('End reached', ToastAndroid.SHORT)}
            pageSize={500}
            initialListSize={500}
            sectionHeaderHeight={22.5}
            tabLabel={dirName}
          />
        ))}
      </ScrollableTabView>
    )
  }
}
