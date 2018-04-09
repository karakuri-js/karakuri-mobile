import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import FavoriteIcon from './FavoriteIcon'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentTextContainer: { flex: 1 },
  contentText: {
    color: '#FFF',
  },
  contentsCount: {},
  contentsCountText: {
    color: '#FFF',
  },
})

const PlaylistStatusBar = ({
  contentsCount,
  group,
  isFavorite,
  onPress,
  onReportPress,
  onStarPress,
  songName,
  type,
  username,
}) => (
  <View style={styles.container}>
    <FavoriteIcon isFavorite={isFavorite} onPress={onStarPress} />
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.contentTextContainer}>
          <Text style={styles.contentText}>
            {group} - {type} - {songName}
          </Text>
          <Text style={styles.contentText}>Requested by {username}</Text>
        </View>
        <View style={styles.contentsCount}>
          <Text style={styles.contentsCountText}>{contentsCount}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
    <TouchableNativeFeedback onPress={onReportPress}>
      <Icon name="warning" size={30} style={{ color: 'red' }} />
    </TouchableNativeFeedback>
  </View>
)

PlaylistStatusBar.propTypes = {
  contentsCount: PropTypes.number.isRequired,
  group: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onStarPress: PropTypes.func.isRequired,
  onReportPress: PropTypes.func.isRequired,
  songName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default PlaylistStatusBar
