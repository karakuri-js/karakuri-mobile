import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getAugmentedHistoryContents } from '../selectors/contents'

import ContentsList from './ContentsList'

export const HistoryScreen = ({ historyContents }) => <ContentsList contents={historyContents} />

HistoryScreen.propTypes = {
  historyContents: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(state => ({ historyContents: getAugmentedHistoryContents(state) }))(
  HistoryScreen,
)
