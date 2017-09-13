import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'
import { getCurrentGroupContents, getCurrentGroupName } from '../selectors/contents'
import { provideGoToContentScreen } from './goToContentScreenHOC'

import ContentsList from './ContentsList'

export const BrowseSongsScreen = props => (
  <ContentsList
    addToPlaylist={props.addToPlaylist}
    contents={props.groupContents}
    hideGroups
    onSelect={props.goToContentScreen}
    title={props.selectedGroupName}
    toggleFavorite={props.toggleFavorite}
  />
)

BrowseSongsScreen.propTypes = {
  addToPlaylist: PropTypes.func.isRequired,
  groupContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  goToContentScreen: PropTypes.func.isRequired,
  selectedGroupName: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
}
export default connect(
  state => ({
    groupContents: getCurrentGroupContents(state),
    selectedGroupName: getCurrentGroupName(state),
  }),
  { addToPlaylist, toggleFavorite },
)(provideGoToContentScreen(BrowseSongsScreen))
