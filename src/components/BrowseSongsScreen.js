import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'
import { getCurrentGroupContents, getCurrentGroupName } from '../selectors/contents'
import { CONTENT_SCREEN } from '../constants/screens'

import ContentsList from './ContentsList'

export class BrowseSongsScreen extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    groupContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedGroupName: PropTypes.string.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
  }

  static navigationOptions = {
    drawerLabel: 'Browse',
  }

  render() {
    const augmentedContents = this.props.groupContents.map(
      // FIXME DO NOT MERGE ME WITH THIS
      content => ({
        ...content,
        goTo: () => this.props.navigation.navigate(CONTENT_SCREEN, { contentId: content.id }),
      }),
    )

    return (
      <ContentsList
        contents={augmentedContents}
        onSelect={this.props.addToPlaylist}
        hideGroups
        title={this.props.selectedGroupName}
        toggleFavorite={this.props.toggleFavorite}
      />
    )
  }
}

export default connect(
  state => ({
    groupContents: getCurrentGroupContents(state),
    selectedGroupName: getCurrentGroupName(state),
  }),
  { addToPlaylist, toggleFavorite },
)(BrowseSongsScreen)
