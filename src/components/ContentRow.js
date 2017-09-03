import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PixelRatio, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Flag from 'react-native-flags'
import Icon from 'react-native-vector-icons/Entypo'

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
    justifyContent: 'space-between',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    color: '#D9E4D7',
    flexWrap: 'wrap',
  },
  flagContainer: {
    width: 32,
  },
  iconsContainer: {
    width: 36,
  },
})

export default class ContentRow extends PureComponent {
  static propTypes = {
    group: PropTypes.string.isRequired,
    hideGroup: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool,
    language: PropTypes.string,
    onPlusPress: PropTypes.func.isRequired,
    onStarPress: PropTypes.func.isRequired,
    songName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isFavorite: false,
    language: '',
    hideGroup: false,
    onSelect: () => {},
  }

  onPlusPress = () => this.props.onPlusPress(this.props.id)

  onStarPress = () => this.props.onStarPress(this.props.id)

  render() {
    const { group, hideGroup, isFavorite, language, songName, type } = this.props

    return (
      <View style={styles.row}>
        <View style={styles.iconsContainer}>
          <TouchableNativeFeedback onPress={this.onStarPress}>
            <Icon
              name={isFavorite ? 'star' : 'star-outlined'}
              size={30}
              style={{ color: isFavorite ? 'yellow' : '#fff' }}
            />
          </TouchableNativeFeedback>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.flagContainer}>
            <Flag code={languageCodes[language] || 'unknown'} size={24} type="flat" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {!hideGroup && `${group} - `}
              {type} - {songName}
            </Text>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableNativeFeedback onPress={this.onPlusPress}>
            <Icon name="plus" size={30} style={{ color: '#fff' }} />
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}
