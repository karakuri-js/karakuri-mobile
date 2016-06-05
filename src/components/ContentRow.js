import React, { Component, PropTypes } from 'react'
import { PixelRatio, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  rowText: {
    fontSize: 16,
  },
})

export class ContentRow extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.onPress.bind(this)
  }

  onPress() {
    this.props.addToPlaylist(this.props.id)
  }

  render() {
    const { type, songName } = this.props
    return (
      <TouchableNativeFeedback
        onPress={this.addToPlaylist}
      >
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {type} - {songName}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
