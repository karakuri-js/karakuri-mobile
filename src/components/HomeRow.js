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
})

export class HomeRow extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.onPress(this.props.item)
  }

  render() {
    const { item } = this.props
    return (
      <View style={styles.row}>
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor="#99d9f4"
        >
          <View style={styles.main}>
            <Text style={styles.mainText}>
              {item}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
