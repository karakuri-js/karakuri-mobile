import React, { Component, PropTypes } from 'react'
import { PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const styles = StyleSheet.create({
  row: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  main: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
  },
  plus: {
    paddingLeft: 5,
  },
  plusText: {
    fontSize: 48,
  },
})

export class ContentRow extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    content: PropTypes.shape({ id: PropTypes.number }),
  }

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.addToPlaylist(this.props.content.id)
  }

  render() {
    const { content } = this.props
    return (
      <View style={styles.row}>
        <View style={styles.main}>
          <Text style={styles.mainText}>
            {content.group} - {content.type} - {content.songName}
          </Text>
        </View>
        <TouchableHighlight
          onPress={this.onPress}
          style={styles.plus}
          underlayColor="#99d9f4"
        >
          <View>
            <Text style={styles.plusText}>+</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
