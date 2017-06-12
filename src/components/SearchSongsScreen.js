import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist } from '../actions'

import FilterList from './FilterList'

export const SearchSongsScreen = props =>
  <FilterList onSelect={props.addToPlaylist} contents={props.allContents} />

SearchSongsScreen.propTypes = {
  allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToPlaylist: PropTypes.func.isRequired,
}

export default connect(({ contents: { allContents } }) => ({ allContents }), { addToPlaylist })(
  SearchSongsScreen,
)
