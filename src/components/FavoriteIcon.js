import React from 'react'
import { PropTypes } from 'prop-types'
import { TouchableNativeFeedback } from 'react-native'

import Icon from 'react-native-vector-icons/Entypo'
import * as Colors from '../constants/colors'

export const FavoriteIcon = ({ isFavorite, onPress }) => (
  <TouchableNativeFeedback onPress={onPress}>
    <Icon
      name={isFavorite ? 'star' : 'star-outlined'}
      size={30}
      style={{ color: isFavorite ? Colors.favorite : Colors.accent }}
    />
  </TouchableNativeFeedback>
)

FavoriteIcon.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default FavoriteIcon
