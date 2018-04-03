import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, StyleSheet, View } from 'react-native'

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
  }

  static defaultProps = { contents: [], randomizePlaylist: () => {}, toggleFavorite: () => {} }

  render() {
    const { contents } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ContentsList
            contents={contents}
            showAddToPlaylist={false}
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

export default connect(state => ({ contents: getAugmentedMyPlaylistContents(state) }), {
  randomizePlaylist,
  toggleFavorite,
})(PlaylistScreen)
