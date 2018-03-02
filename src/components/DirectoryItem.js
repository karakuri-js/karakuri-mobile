import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

import * as Colors from '../constants/colors'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.primaryText,
  },
})

export default class DirectoryItem extends PureComponent {
  static propTypes = {
    directory: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  onPress = () => {
    this.props.onPress(this.props.directory)
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <Text style={styles.item}>{this.props.directory}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
