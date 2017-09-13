import React, { PureComponent } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Video from 'react-native-video'

import { addToPlaylist, toggleFavorite } from '../actions'
import { getAllContents } from '../selectors/contents'
import ContentRow from './ContentRow'

const { width } = Dimensions.get('window')
const nothingFn = () => {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width,
    height: 200,
    backgroundColor: '#000',
  },
  lyrics: {
    flex: 1,
  },
  lyricsContentContainer: {
    alignItems: 'center',
    padding: 5,
  },
  lyricsLine: {
    textAlign: 'center',
  },
  reportTouchableFeedback: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  reportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 5,
  },
  reportIcon: {
    color: 'red',
  },
  reportText: {
    color: 'red',
  },
})

export class ContentScreen extends PureComponent {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    allContents: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { content: null, lyrics: [] }
  }

  componentWillMount() {
    const content = this.props.allContents.find(c => c.id === this.props.id)
    if (content) {
      this.setState({ content })
      this.getLyrics(content)
    }
  }

  getLyrics = ({ id }) =>
    fetch(this.props.url.concat(`/contents/${id}`))
      .then(response => response.json())
      .then(({ lyrics }) => this.setState({ lyrics }))
      .catch(err => console.error(err))

  render() {
    const { content, lyrics } = this.state
    const { url } = this.props

    if (!content) {
      return (
        <View>
          <Text>No content found :(</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Video source={{ uri: `${url}/${content.path}` }} resizeMode="cover" style={styles.video} />

        <ContentRow
          {...content}
          onPlusPress={this.props.addToPlaylist}
          onReportPress={nothingFn}
          onStarPress={this.props.toggleFavorite}
        />
        <TouchableNativeFeedback
          onPress={this.onReportPress}
          style={styles.reportTouchableFeedback}
        >
          <View style={styles.reportContainer}>
            <Icon name="warning" size={30} style={styles.reportIcon} />
            <Text style={styles.reportText}>Report</Text>
          </View>
        </TouchableNativeFeedback>
        <ScrollView contentContainerStyle={styles.lyricsContentContainer} style={styles.lyrics}>
          {lyrics &&
            lyrics.map((lyricsLine, key) => (
              <Text
                style={styles.lyricsLine}
                key={key} // eslint-disable-line react/no-array-index-key
              >
                {lyricsLine}
              </Text>
            ))}
        </ScrollView>
        <View />
      </View>
    )
  }
}

export default connect(
  state => ({
    allContents: getAllContents(state),
    url: state.connection.url,
  }),
  { addToPlaylist, toggleFavorite },
)(ContentScreen)
