import React from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MenuItem } from './MenuItem'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    flex: 1,
  },
  directoriesContainer: {
    padding: 10,
  },
  header: {
    height: 55,
    backgroundColor: '#0D1011',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerText: {
    color: '#D9E4D7',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export const Menu = ({ directories, onDirectorySelect }) => (
  <View style={styles.container}>
    <View style={styles.header} elevation={10}>
      <Text style={styles.headerText}>
        Karakuri
      </Text>
    </View>

    <ScrollView style={styles.directoriesContainer}>
      {directories.map((directory, key) => (
        <MenuItem
          key={key}
          directory={directory}
          onDirectorySelect={onDirectorySelect}
        />
      ))}
    </ScrollView>
  </View>
)

Menu.propTypes = {
  directories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDirectorySelect: PropTypes.func.isRequired,
}
