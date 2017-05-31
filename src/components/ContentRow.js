import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    group: PropTypes.string.isRequired,
    hideGroup: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    songName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    hideGroup: false,
    onSelect: () => {},
  }

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.onSelect(this.props.id)
  }

  render() {
    const { group, hideGroup, songName, type } = this.props
    return (
      <TouchableNativeFeedback
        onPress={this.onPress}
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
