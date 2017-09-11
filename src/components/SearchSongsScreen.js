import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getAllContents } from '../selectors/contents'

import ContentsList from './ContentsList'

export const SearchSongsScreen = ({ allContents, ...props }) => (
  <ContentsList
    contents={allContents}
    displaySearch
    onSelect={props.addToPlaylist}
    toggleFavorite={props.toggleFavorite}
  />
)

SearchSongsScreen.propTypes = {
  allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToPlaylist: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}

export default connect(state => ({ allContents: getAllContents(state) }), {
  addToPlaylist,
  toggleFavorite,
})(SearchSongsScreen)
