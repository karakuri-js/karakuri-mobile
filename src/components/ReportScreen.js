import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
  },
  optionText: {
    fontSize: 20,
  },
})

export class ReportScreen extends PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired,
  }

  report = () => {}

  render() {
    const { content } = this.props

    return (
      <View style={styles.container}>
        <HeaderTitle title={`Report - ${content.songName}`} />
        <View style={styles.optionsContainer}>
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <Text style={styles.optionText}>Lyrics error</Text>
            </View>
            <View style={styles.option}>
              <Text style={styles.optionText}>Video needs trimming</Text>
            </View>
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <Text style={styles.optionText}>Video is lagging</Text>
            </View>
            <View style={styles.option}>
              <Text style={styles.optionText}>Subtitles need style fix</Text>
            </View>
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <Text style={styles.optionText}>Other</Text>
            </View>
            <View style={styles.option}>
              <Text style={styles.optionText}>Cancel</Text>
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
}))(ReportScreen)
