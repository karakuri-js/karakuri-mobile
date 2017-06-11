import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist } from '../actions'

import ContentsList from './ContentsList'

export class BrowseSongsScreen extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    contents: PropTypes.array,
    hideGroups: PropTypes.bool,
    title: PropTypes.string,
  }

  render() {
    return (
      <ContentsList
        onSelect={this.props.addToPlaylist}
        contents={this.props.contents}
        hideGroups
        title={this.props.title}
      />
    )
  }
}

export default connect(
  ({ karaoke: { groupContents, selectedGroupName } }) => ({ contents: groupContents, title: selectedGroupName }),
  { addToPlaylist },
)(BrowseSongsScreen)
