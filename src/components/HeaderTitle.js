import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import * as Colors from '../constants/colors'

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: Colors.text,
  },
  headerText: {
    color: Colors.secondaryText,
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export const HeaderTitle = ({ title }) => (
  <View style={styles.header} elevation={10}>
    <Text numberOfLines={1} style={styles.headerText}>
      {title}
    </Text>
  </View>
)

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default HeaderTitle
