import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist } from '../actions'

import FilterList from './FilterList'

export class SearchSongsScreen extends Component {
  static propTypes = {
    allContents: PropTypes.array,
    addToPlaylist: PropTypes.func.isRequired,
  }

  render() {
    return (
      <FilterList
        onSelect={this.props.addToPlaylist}
        contents={this.props.allContents}
      />
    )
  }
}

export default connect(
  ({ karaoke: { allContents } }) => ({ allContents }),
  { addToPlaylist },
)(SearchSongsScreen)
