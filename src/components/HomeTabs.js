import React, { Component, PropTypes } from 'react'
import { ListView } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { getContentsPerDirectories } from '../lib/contentsFormatter'
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
    this.prepareContentsListViews({ contents: this.props.contents, isInitial: true })
  }

  componentWillReceiveProps(nextProps) {
    // TODO check if the contents have changed before doing this
    this.prepareContentsListViews({ contents: nextProps.contents, isInitial: false })
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

  prepareContentsListViews({ contents, isInitial }) {
    // Group contents per directory, then create listview datasources
    const contentsPerDirectories = getContentsPerDirectories(contents)
    const listViewsPerDirectories = Object.keys(contentsPerDirectories).reduce((obj, dirName) => {
      const dataSource = isInitial ?
        new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }) :
        this.state.listViewsPerDirectories[dirName]
      return {
        ...obj,
        [dirName]: dataSource.cloneWithRows(contentsPerDirectories[dirName]),
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
          <ListView
            key={dirNameKey}
            dataSource={this.state.listViewsPerDirectories[dirName]}
            renderRow={this.renderRow}
            tabLabel={dirName}
          />
        ))}
      </ScrollableTabView>
    )
  }
}
