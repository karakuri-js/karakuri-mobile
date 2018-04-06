import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAugmentedFavoriteContents } from '../selectors/contents'

import ContentsList from './ContentsList'

const FavoritesScreen = props => (
  <ContentsList contents={props.favoriteContents} title="Favorites" />
)

FavoritesScreen.propTypes = {
  favoriteContents: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(state => ({
  favoriteContents: getAugmentedFavoriteContents(state),
}))(FavoritesScreen)
