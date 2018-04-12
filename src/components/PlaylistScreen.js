import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, StyleSheet, View, ToastAndroid } from 'react-native'

import { toggleFavorite, randomizePlaylist } from '../actions'
import { getAugmentedMyPlaylistContents } from '../selectors/contents'
import * as Colors from '../constants/colors'

import ContentsList from './ContentsList'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    flex: 1,
  },
  listContainer: {
    flex: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
})

export class PlaylistScreen extends PureComponent {
  static propTypes = {
    contents: PropTypes.array,
    randomizePlaylist: PropTypes.func,
    toggleFavorite: PropTypes.func,
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }

  static defaultProps = { contents: [], randomizePlaylist: () => {}, toggleFavorite: () => {} }

  sendSortedPlaylist = contentIds => {
    fetch(`${this.props.url}/sortPlaylist`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ contentIds, username: this.props.username }),
    })
      .then(response => response.json())
      .catch(err => {
        ToastAndroid.show(err.toString(), ToastAndroid.LONG)
      })
  }

  render() {
    const { contents } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ContentsList
            contents={contents}
            isReorderable
            showAddToPlaylist={false}
            showToggleFavorites={false}
            onReorder={this.sendSortedPlaylist}
            title="My Playlist"
            toggleFavorite={this.props.toggleFavorite}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.randomizePlaylist}
            color={Colors.darkPrimary}
            title="Randomize"
          />
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    contents: getAugmentedMyPlaylistContents(state),
    url: state.connection.url,
    username: state.connection.username,
  }),
  {
    randomizePlaylist,
    toggleFavorite,
  },
)(PlaylistScreen)
