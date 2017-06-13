import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist } from '../actions'

import ContentsList from './ContentsList'

export class BrowseSongsScreen extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    groupContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedGroupName: PropTypes.string.isRequired,
  }

  static navigationOptions = {
    drawerLabel: 'Browse',
  }

  render() {
    return (
      <ContentsList
        onSelect={this.props.addToPlaylist}
        contents={this.props.groupContents}
        hideGroups
        title={this.props.selectedGroupName}
      />
    )
  }
}

export default connect(
  ({ contents: { groupContents, selectedGroupName } }) => ({ groupContents, selectedGroupName }),
  { addToPlaylist },
)(BrowseSongsScreen)
