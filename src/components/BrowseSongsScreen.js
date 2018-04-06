import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentGroupContents, getCurrentGroupName } from '../selectors/contents'

import ContentsList from './ContentsList'

export const BrowseSongsScreen = props => (
  <ContentsList contents={props.groupContents} hideGroups title={props.selectedGroupName} />
)

BrowseSongsScreen.propTypes = {
  groupContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedGroupName: PropTypes.string.isRequired,
}
export default connect(state => ({
  groupContents: getCurrentGroupContents(state),
  selectedGroupName: getCurrentGroupName(state),
}))(BrowseSongsScreen)
