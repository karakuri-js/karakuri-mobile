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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  mainContainer: {
    flex: 1,
  },
  textAndIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.primaryText,
    flexWrap: 'wrap',
    flex: 1,
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
    onTitlePress: PropTypes.func,
    showPlus: PropTypes.bool,
    showStar: PropTypes.bool,
    songName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    isFavorite: false,
    language: '',
    hideGroup: false,
    onPlusPress: () => {},
    onStarPress: () => {},
    onTitlePress: () => {},
    showPlus: true,
    showStar: true,
  }

  onPlusPress = () => this.props.onPlusPress(this.props.id)

  onStarPress = () => this.props.onStarPress(this.props.id)

  onTitlePress = () => this.props.onTitlePress(this.props)

  render() {
    const {
      group,
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
        <View style={styles.mainContainer}>
          <TouchableNativeFeedback onPress={this.onTitlePress}>
            <View style={styles.textAndIconsContainer}>
              <View style={styles.iconsContainer}>
                <Flag code={languageCodes[language] || 'unknown'} size={24} type="flat" />
              </View>
              <Text style={styles.text}>
                {!hideGroup && `${group} - `}
                {type} - {songName}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
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
