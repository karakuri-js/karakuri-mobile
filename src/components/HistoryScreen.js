import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getAugmentedHistoryContents } from '../selectors/contents'
import { provideGoToContentScreen } from './goToContentScreenHOC'

import ContentsList from './ContentsList'

export const HistoryScreen = ({ historyContents, ...props }) => (
  <ContentsList
    addToPlaylist={props.addToPlaylist}
    contents={historyContents}
    onSelect={props.goToContentScreen}
    toggleFavorite={props.toggleFavorite}
  />
)

HistoryScreen.propTypes = {
  addToPlaylist: PropTypes.func.isRequired,
  historyContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  goToContentScreen: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}

export default connect(state => ({ historyContents: getAugmentedHistoryContents(state) }), {
  addToPlaylist,
  toggleFavorite,
})(provideGoToContentScreen(HistoryScreen))
