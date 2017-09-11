import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'
import { getCurrentGroupContents, getCurrentGroupName } from '../selectors/contents'

import ContentsList from './ContentsList'

export class BrowseSongsScreen extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    groupContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedGroupName: PropTypes.string.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
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
        toggleFavorite={this.props.toggleFavorite}
      />
    )
  }
}

export default connect(
  state => ({
    groupContents: getCurrentGroupContents(state),
    selectedGroupName: getCurrentGroupName(state),
  }),
  { addToPlaylist, toggleFavorite },
)(BrowseSongsScreen)
