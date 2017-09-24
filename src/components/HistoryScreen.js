import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getHistoryContents } from '../selectors/contents'

import ContentsList from './ContentsList'

export const HistoryScreen = ({ historyContents, ...props }) => (
  <ContentsList
    contents={historyContents}
    onSelect={props.addToPlaylist}
    toggleFavorite={props.toggleFavorite}
  />
)

HistoryScreen.propTypes = {
  historyContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToPlaylist: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}

export default connect(state => ({ historyContents: getHistoryContents(state) }), {
  addToPlaylist,
  toggleFavorite,
})(HistoryScreen)
