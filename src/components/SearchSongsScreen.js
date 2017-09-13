import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getAllAugmentedContents } from '../selectors/contents'

import ContentsList from './ContentsList'
import { provideGoToContentScreen } from './goToContentScreenHOC'

export const SearchSongsScreen = ({ allContents, ...props }) => (
  <ContentsList
    addToPlaylist={props.addToPlaylist}
    contents={allContents}
    displaySearch
    onSelect={props.goToContentScreen}
    toggleFavorite={props.toggleFavorite}
  />
)

SearchSongsScreen.propTypes = {
  allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToPlaylist: PropTypes.func.isRequired,
  goToContentScreen: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}

export default connect(state => ({ allContents: getAllAugmentedContents(state) }), {
  addToPlaylist,
  toggleFavorite,
})(provideGoToContentScreen(SearchSongsScreen))
