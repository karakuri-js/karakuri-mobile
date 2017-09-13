import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToPlaylist, toggleFavorite } from '../actions'

export class ContentScreen extends PureComponent {
  static propTypes = {
    allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    contentId: PropTypes.string.isRequired,
  }

  render() {
    const content = this.props.allContents.find(c => c.id === this.props.contentId)

    if (!content) {
      return (
        <View>
          <Text>No content found :(</Text>
        </View>
      )
    }

    return (
      <View>
        <Text>{JSON.stringify(content)}</Text>
      </View>
    )
  }
}

export default connect(
  ({ contents: { allContents } }) => ({
    allContents,
  }),
  { addToPlaylist, toggleFavorite },
)(ContentScreen)
