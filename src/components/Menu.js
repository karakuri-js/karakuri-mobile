import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { MenuItem } from './MenuItem'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  directoriesContainer: {
    padding: 10,
  },
  header: {
    height: 55,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerText: {
    color: '#FFF',
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

    <View style={styles.directoriesContainer}>
      {directories.map((directory, key) => (
        <MenuItem
          key={key}
          directory={directory}
          onDirectorySelect={onDirectorySelect}
        />
      ))}
    </View>
  </View>
)

Menu.propTypes = {
  directories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDirectorySelect: PropTypes.func.isRequired,
}
