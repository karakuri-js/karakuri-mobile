import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'
import { getAllContents } from '../selectors/contents'

import ContentsList from './ContentsList'

export class FavoritesScreen extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    favorites: PropTypes.object.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
  }

  isFavorite = content => this.props.favorites[content.id]

  render() {
    return (
      <ContentsList
        onSelect={this.props.addToPlaylist}
        contents={this.props.allContents.filter(this.isFavorite)}
        favorites={this.props.favorites}
        title="Favorites"
        toggleFavorite={this.props.toggleFavorite}
      />
    )
  }
}

export default connect(
  state => ({
    allContents: getAllContents(state),
    favorites: state.favorites,
  }),
  { addToPlaylist, toggleFavorite },
)(FavoritesScreen)
