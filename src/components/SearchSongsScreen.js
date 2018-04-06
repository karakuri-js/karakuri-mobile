import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getAllAugmentedContents } from '../selectors/contents'

import ContentsList from './ContentsList'

export const SearchSongsScreen = ({ allContents }) => (
  <ContentsList contents={allContents} displaySearch />
)

SearchSongsScreen.propTypes = {
  allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(state => ({ allContents: getAllAugmentedContents(state) }), {})(
  SearchSongsScreen,
)
