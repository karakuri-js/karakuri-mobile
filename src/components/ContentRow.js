import React, { Component, PropTypes } from 'react'
import { PixelRatio, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'stretch',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  main: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
  },
  plus: {},
  plusText: {
    fontSize: 36,
  },
})

export class ContentRow extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    item: PropTypes.shape({ id: PropTypes.number }),
  }

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.addToPlaylist(this.props.item.id)
  }

  render() {
    const { item: content } = this.props
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
