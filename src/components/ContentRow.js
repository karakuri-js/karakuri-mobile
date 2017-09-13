import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PixelRatio, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Flag from 'react-native-flags'
import Icon from 'react-native-vector-icons/Entypo'
import * as Colors from '../constants/colors'

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
  textContainer: {
    flex: 1,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    color: Colors.primaryText,
    flexWrap: 'wrap',
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
    onPlusPress: PropTypes.func,
    onStarPress: PropTypes.func,
    showStar: PropTypes.bool,
    showPlus: PropTypes.bool,
    songName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isFavorite: false,
    language: '',
    hideGroup: false,
    onPlusPress: () => {},
    onStarPress: () => {},
    showPlus: true,
    showStar: true,
  }

  onPlusPress = () => this.props.onPlusPress(this.props.id)

  onStarPress = () => this.props.onStarPress(this.props.id)

  render() {
    const {
      group,
      goTo,
      hideGroup,
      isFavorite,
      language,
      showPlus,
      showStar,
      songName,
      type,
    } = this.props

    return (
      <View style={styles.row}>
        {showStar && (
          <View style={styles.iconsContainer}>
            <TouchableNativeFeedback onPress={this.onStarPress}>
              <Icon
                name={isFavorite ? 'star' : 'star-outlined'}
                size={30}
                style={{ color: isFavorite ? '#FFC107' : Colors.accent }}
              />
            </TouchableNativeFeedback>
          </View>
        )}
        <View style={styles.iconsContainer}>
          <Flag code={languageCodes[language] || 'unknown'} size={24} type="flat" />
        </View>
        <TouchableNativeFeedback style={styles.textContainer} onPress={goTo}>
          <Text style={styles.text}>
            {!hideGroup && `${group} - `}
            {type} - {songName}
          </Text>
        </TouchableNativeFeedback>
        {showPlus && (
          <View style={styles.iconsContainer}>
            <TouchableNativeFeedback onPress={this.onPlusPress}>
              <Icon name="plus" size={30} style={{ color: Colors.accent }} />
            </TouchableNativeFeedback>
          </View>
        )}
      </View>
    )
  }
}
