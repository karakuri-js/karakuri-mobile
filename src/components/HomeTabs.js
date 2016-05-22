import React, { Component, PropTypes } from 'react'
import { ScrollView } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import contentsFormatter from '../lib/contentsFormatter'
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
  }

  componentWillMount() {
    this.setState({ formattedContents: contentsFormatter(this.props.contents) })
  }

  componentWillReceiveProps() {
    // TODO check if the contents have changed before doing this
    this.setState({ formattedContents: contentsFormatter(this.props.contents) })
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

  render() {
    return (
      <ScrollableTabView>
        {Object.keys(this.state.formattedContents).map((dirName, dirNameKey) => (
          <ScrollView
            key={dirNameKey}
            tabLabel={dirName}
          >
            {this.state.formattedContents[dirName].map(
              (content, contentKey) => (
                <ContentRow
                  key={contentKey}
                  content={content}
                  addToPlaylist={this.addToPlaylist}
                />
            ))}
          </ScrollView>
        ))}
      </ScrollableTabView>
    )
  }
}
