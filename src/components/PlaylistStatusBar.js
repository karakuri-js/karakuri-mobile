import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {

  },
  contentText: {
    color: '#FFF',
  },
  contentsCount: {

  },
  contentsCountText: {
    color: '#FFF',
  },
})

export const PlaylistStatusBar = ({ group, type, songName, contentsCount }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.contentText}>
        {group} - {type} - {songName}
      </Text>
    </View>
    <View style={styles.contentsCount}>
      <Text style={styles.contentsCountText}>{contentsCount}</Text>
    </View>
  </View>
)

PlaylistStatusBar.propTypes = {
  group: PropTypes.string.isRequired,
  songName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  contentsCount: PropTypes.number,
}
