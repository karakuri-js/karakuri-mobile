import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native'

import PropTypes from 'prop-types'

const ALPHA_FONT_FAMILY = Platform.select({
  ios: 'Gill Sans',
  android: 'sans-serif',
})
const styles = StyleSheet.create({
  alphabetButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetButtonContainerStyle: {
    flex: 1,
    paddingVertical: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alphabetTextStyle: {
    fontFamily: ALPHA_FONT_FAMILY,
    fontSize: 16,
    color: 'rgb(90,90,90)',
  },
  selectedAlphabetTextStyle: {
    fontFamily: ALPHA_FONT_FAMILY,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgb(90,90,90)',
  },
})

export default class AlphabetItem extends Component {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    onPressLetter: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  handlePress = () => {
    this.props.onPressLetter(this.props.letter)
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress} style={styles.alphabetButtonContainerStyle}>
        <View style={styles.alphabetButtonStyle}>
          <Text
            style={
              this.props.selected ? styles.selectedAlphabetTextStyle : styles.alphabetTextStyle
            }
          >
            {this.props.letter}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
