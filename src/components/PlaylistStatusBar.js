import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
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

export const PlaylistStatusBar = ({
  contentsCount,
  group,
  onPress,
  songName,
  type,
  username,
}) => (
  <TouchableNativeFeedback onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          {group} - {type} - {songName}
        </Text>
        <Text style={styles.contentText}>
          Requested by {username}
        </Text>
      </View>
      <View style={styles.contentsCount}>
        <Text style={styles.contentsCountText}>{contentsCount}</Text>
      </View>
    </View>
  </TouchableNativeFeedback>
)

PlaylistStatusBar.propTypes = {
  contentsCount: PropTypes.number.isRequired,
  group: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  songName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}
