import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'

import ContentsList from './ContentsList'

export const SearchSongsScreen = ({ allContents, favorites, ...props }) => (
  <ContentsList
    contents={allContents}
    displaySearch
    onSelect={props.addToPlaylist}
    favorites={favorites}
    toggleFavorite={props.toggleFavorite}
  />
)

SearchSongsScreen.propTypes = {
  allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToPlaylist: PropTypes.func.isRequired,
  favorites: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}

export default connect(({ contents: { allContents }, favorites }) => ({ allContents, favorites }), {
  addToPlaylist,
  toggleFavorite,
})(SearchSongsScreen)
