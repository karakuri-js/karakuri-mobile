import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getAllContents } from '../selectors/contents'

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

export default connect(
  state => ({ allContents: getAllContents(state), favorites: state.favorites }),
  {
    addToPlaylist,
    toggleFavorite,
  },
)(SearchSongsScreen)
