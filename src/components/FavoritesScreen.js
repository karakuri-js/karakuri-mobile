import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'
import { getAugmentedFavoriteContents } from '../selectors/contents'
import { provideGoToContentScreen } from './goToContentScreenHOC'

import ContentsList from './ContentsList'

const FavoritesScreen = props => (
  <ContentsList
    addToPlaylist={props.addToPlaylist}
    contents={props.favoriteContents}
    onSelect={props.goToContentScreen}
    title="Favorites"
    toggleFavorite={props.toggleFavorite}
  />
)

FavoritesScreen.propTypes = {
  addToPlaylist: PropTypes.func.isRequired,
  favoriteContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  goToContentScreen: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    favoriteContents: getAugmentedFavoriteContents(state),
  }),
  { addToPlaylist, toggleFavorite },
)(provideGoToContentScreen(FavoritesScreen))
