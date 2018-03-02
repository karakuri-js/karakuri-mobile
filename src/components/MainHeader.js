import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import * as Colors from '../constants/colors'

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 10,
    elevation: 10,
  },
  headerText: {
    color: Colors.text,
    fontSize: 25,
    textAlign: 'center',
  },
  menuButton: {
    color: Colors.text,
  },
})

export default class MainHeader extends PureComponent {
  static propTypes = {
    openMenu: PropTypes.func.isRequired,
    openSearch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  openMenu = () => {
    this.props.openMenu()
  }

  openSearch = () => {
    this.props.openSearch()
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableHighlight underlayColor="#333" onPress={this.openMenu}>
          <Icon name="navicon" size={50} style={styles.menuButton} />
        </TouchableHighlight>

        <Text style={styles.headerText}>{this.props.title}</Text>
        <TouchableHighlight underlayColor="#333" onPress={this.openSearch}>
          <Icon name="search" size={50} style={styles.menuButton} />
        </TouchableHighlight>
      </View>
    )
  }
}
