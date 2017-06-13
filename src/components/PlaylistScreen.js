import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import Button from 'apsl-react-native-button'

import { randomizePlaylist } from '../actions'

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
  }

  static defaultProps = { contents: [], randomizePlaylist: () => {} }

  static navigationOptions = {
    drawerLabel: 'Playlist',
  }

  render() {
    const { contents } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ContentsList contents={contents} title="My Playlist" />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.randomizePlaylist}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            Randomize
          </Button>
        </View>
      </View>
    )
  }
}

export default connect(({ playlist }) => ({ contents: playlist.myPlaylistContents }), {
  randomizePlaylist,
})(PlaylistScreen)
