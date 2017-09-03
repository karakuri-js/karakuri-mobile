import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'

import ContentsList from './ContentsList'

export class BrowseSongsScreen extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    groupContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedGroupName: PropTypes.string.isRequired,
    favorites: PropTypes.object.isRequired,
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
        favorites={this.props.favorites}
        hideGroups
        title={this.props.selectedGroupName}
        toggleFavorite={this.props.toggleFavorite}
      />
    )
  }
}

export default connect(
  ({ contents: { groupContents, selectedGroupName }, favorites }) => ({
    groupContents,
    selectedGroupName,
    favorites,
  }),
  { addToPlaylist, toggleFavorite },
)(BrowseSongsScreen)
