import React, { PureComponent } from 'react'
import { StyleSheet, Text, ToastAndroid, TouchableNativeFeedback, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as Colors from '../constants/colors'
import { getSelectedAugmentedContent } from '../selectors/contents'
import HeaderTitle from './HeaderTitle'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionsContainer: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  option: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.divider,
    padding: 10
  },
  optionText: {
    fontSize: 20,
    textAlign: 'center'
  },
})

const LYRICS_LABEL = 'Lyrics error'
const VIDEO_TRIM_LABEL = 'Video needs trimming'
const VIDEO_LAG_LABEL = 'Video is lagging'
const SUBTITLES_LABEL = 'Subtitles need style fix'
const OTHER_LABEL = 'Other'
const CANCEL_LABEL = 'Cancel'

export class ReportScreen extends PureComponent {
  static propTypes = {
    back: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }

  goBack = () => this.props.back()

  report = comment => {
    fetch(`${this.props.url}/report`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ comment, id: this.props.content.id, username: this.props.username }),
    })
      .then(response => response.json())
      .then(({ message }) => {
        ToastAndroid.show(message, ToastAndroid.LONG)
      })
      .catch(err => {
        ToastAndroid.show(err.toString(), ToastAndroid.LONG)
      })
    }

    reportLyrics = () => this.report(LYRICS_LABEL)
    reportVideoTrim = () => this.report(VIDEO_TRIM_LABEL)
    reportVideoLag = () => this.report(VIDEO_LAG_LABEL)
    reportSubtitles = () => this.report(SUBTITLES_LABEL)
    reportOther = () => this.report(OTHER_LABEL)

  render() {
    const { content } = this.props

    return (
      <View style={styles.container}>
        <HeaderTitle title={`Report - ${content.songName}`} />
        <View style={styles.optionsContainer}>
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <TouchableNativeFeedback onPress={this.reportLyrics}>
                <Text style={styles.optionText}>{LYRICS_LABEL}</Text>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.option}>
              <TouchableNativeFeedback onPress={this.reportVideoTrim}>
                <Text style={styles.optionText}>{VIDEO_TRIM_LABEL}</Text>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <TouchableNativeFeedback onPress={this.reportVideoLag}>
                <Text style={styles.optionText}>{VIDEO_LAG_LABEL}</Text>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.option}>
              <TouchableNativeFeedback onPress={this.reportSubtitles}>
                <Text style={styles.optionText}>{SUBTITLES_LABEL}</Text>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <TouchableNativeFeedback onPress={this.reportOther}>
                <Text style={styles.optionText}>{OTHER_LABEL}</Text>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.option}>
              <TouchableNativeFeedback onPress={this.goBack}>
                <Text style={styles.optionText}>{CANCEL_LABEL}</Text>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(state => ({
  content: getSelectedAugmentedContent(state),
  url: state.connection.url,
  username: state.connection.username,
}), { back: NavigationActions.back })(ReportScreen)
