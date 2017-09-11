import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'
import { getFavoritesContents } from '../selectors/contents'

import ContentsList from './ContentsList'

const FavoritesScreen = props => (
  <ContentsList
    onSelect={props.addToPlaylist}
    contents={props.favoriteContents}
    title="Favorites"
    toggleFavorite={props.toggleFavorite}
  />
)

FavoritesScreen.propTypes = {
  addToPlaylist: PropTypes.func.isRequired,
  favoriteContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    favoriteContents: getFavoritesContents(state),
  }),
  { addToPlaylist, toggleFavorite },
)(FavoritesScreen)
