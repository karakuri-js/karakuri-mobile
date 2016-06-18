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
    color: '#D9E4D7',
  },
})

export class ContentRow extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    group: PropTypes.string.isRequired,
    hideGroup: PropTypes.bool,
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    songName: PropTypes.string.isRequired,
  }

  static defaultProps = {
    hideGroup: false,
  }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.onPress.bind(this)
  }

  onPress() {
    this.props.addToPlaylist(this.props.id)
  }

  render() {
    const { group, hideGroup, songName, type } = this.props
    return (
      <TouchableNativeFeedback
        onPress={this.addToPlaylist}
      >
        <View style={styles.row}>
          <Text style={styles.rowText}>
            {!hideGroup && `${group} - `}
            {type} - {songName}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
