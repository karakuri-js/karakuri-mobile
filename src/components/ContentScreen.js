import React, { PureComponent } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

<<<<<<< HEAD
import { addToPlaylist, removeFromPlaylist, toggleFavorite } from '../actions'
import {
  getSelectedAugmentedContent,
  isSelectedContentInMyPlaylist,
  isSelectedContentPlaying,
} from '../selectors/contents'
=======
import { addToPlaylist, toggleFavorite } from '../actions'
import * as Colors from '../constants/colors'
import { REPORT_SCREEN } from '../constants/screens'
import { getSelectedAugmentedContent } from '../selectors/contents'
>>>>>>> Basic report screen setup
import HeaderTitle from './HeaderTitle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lyrics: {
    flex: 1,
  },
  lyricsContentContainer: {
    alignItems: 'center',
    padding: 5,
  },
  lyricsLine: {
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 5,
  },
})

export class ContentScreen extends PureComponent {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
    isInMyPlaylist: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
    removeFromPlaylist: PropTypes.func.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { lyrics: [] }
  }

  componentWillMount() {
    if (!this.props.content.id) return
    fetch(this.props.url.concat(`/contents/${this.props.content.id}`))
      .then(response => response.json())
      .then(({ lyrics }) => this.setState({ lyrics }))
      .catch(err => console.error(err))
  }

  report = () => this.props.navigation.navigate(REPORT_SCREEN, { contentId: this.props.content.id })
  addToPlaylist = () => this.props.addToPlaylist(this.props.content.id)
  removeFromPlaylist = () => this.props.removeFromPlaylist(this.props.content.id)
  toggleFavorite = () => this.props.toggleFavorite(this.props.content.id)

  render() {
    const { content, isInMyPlaylist, isPlaying } = this.props
    const { lyrics } = this.state

    if (!content.songName) {
      return (
        <View>
          <Text>No content found :(</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <HeaderTitle title={content.songName} />
        <View>
          <View style={styles.buttonContainer}>
            {isPlaying ? ( // eslint-disable-line no-nested-ternary
              <Button disabled onPress={this.addToPlaylist} title="Playing right now!" />
            ) : isInMyPlaylist ? (
              <Button onPress={this.removeFromPlaylist} title="Remove from Playlist" />
            ) : (
              <Button onPress={this.addToPlaylist} title="Add to Playlist" />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.toggleFavorite}
              title={content.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              color={content.isFavorite ? Colors.accent : Colors.favorite}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this.report} title="Report" color={Colors.error} />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.lyricsContentContainer} style={styles.lyrics}>
          {lyrics &&
            lyrics.map((lyricsLine, key) => (
              <Text
                style={styles.lyricsLine}
                key={key} // eslint-disable-line react/no-array-index-key
              >
                {lyricsLine}
              </Text>
            ))}
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    content: getSelectedAugmentedContent(state),
    isInMyPlaylist: isSelectedContentInMyPlaylist(state),
    isPlaying: isSelectedContentPlaying(state),
    url: state.connection.url,
  }),
  { addToPlaylist, removeFromPlaylist, toggleFavorite },
)(ContentScreen)
