import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableNativeFeedback, View, Dimensions } from 'react-native'

import * as Colors from '../constants/colors'

const styles = StyleSheet.create({
  row: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    width: Dimensions.get('window').width - 40,
    height: 45,
  },
  rowText: {
    fontSize: 16,
    color: Colors.secondaryText,
  },
})

export default class GroupRow extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    item: PropTypes.string.isRequired,
  }

  onPress = () => {
    this.props.onPress(this.props.item)
  }

  render() {
    const { item } = this.props
    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View style={styles.row}>
          <Text style={styles.rowText}>{item}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
