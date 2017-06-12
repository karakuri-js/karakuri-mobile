import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist } from '../actions'

import ContentsList from './ContentsList'

export const BrowseSongsScreen = props => (
  <ContentsList
    onSelect={props.addToPlaylist}
    contents={props.groupContents}
    hideGroups
    title={props.selectedGroupName}
  />
)

BrowseSongsScreen.propTypes = {
  addToPlaylist: PropTypes.func.isRequired,
  groupContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedGroupName: PropTypes.string.isRequired,
}

export default connect(
  ({ contents: { groupContents, selectedGroupName } }) => ({ groupContents, selectedGroupName }),
  { addToPlaylist },
)(BrowseSongsScreen)
