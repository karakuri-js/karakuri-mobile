import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PixelRatio, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Flag from 'react-native-flags'

const languageCodes = {
  eng: 'US',
  fre: 'FR',
  rus: 'RU',
  deu: 'DE',
  ita: 'IT',
  esp: 'ES',
  jpn: 'JP',
  swe: 'SE',
  kor: 'KR',
}

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  rowText: {
    fontSize: 16,
    color: '#D9E4D7',
  },
  flagContainer: {
    width: 32,
  },
})

export default class ContentRow extends PureComponent {
  static propTypes = {
    group: PropTypes.string.isRequired,
    hideGroup: PropTypes.bool,
    id: PropTypes.string.isRequired,
    language: PropTypes.string,
    onSelect: PropTypes.func,
    songName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    language: '',
    hideGroup: false,
    onSelect: () => {},
  }

  onPress = () => {
    this.props.onSelect(this.props.id)
  }

  render() {
    const { group, hideGroup, language, songName, type } = this.props

    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View style={styles.row}>
          <View style={styles.flagContainer}>
            <Flag code={languageCodes[language] || 'unknown'} size={24} type="flat" />
          </View>
          <Text style={styles.rowText}>
            {!hideGroup && `${group} - `}
            {type} - {songName}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
