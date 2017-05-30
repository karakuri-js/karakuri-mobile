import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: '#0D1011',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 10,
    elevation: 10,
  },
  headerText: {
    color: '#D9E4D7',
    fontSize: 25,
    textAlign: 'center',
  },
  menuButton: {
    color: '#D9E4D7',
  },
})

export class HomeHeader extends Component {
  static propTypes = {
    openMenu: PropTypes.func.isRequired,
    openSearch: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this)
    this.openSearch = this.openSearch.bind(this)
  }

  openMenu() {
    this.props.openMenu()
  }

  openSearch() {
    this.props.openSearch()
  }

  render() {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor="#333"
          onPress={this.openMenu}
        >
          <Icon
            name="navicon"
            size={50}
            style={styles.menuButton}
          />
        </TouchableHighlight>

        <Text style={styles.headerText}>{this.props.title}</Text>
        <TouchableHighlight
          underlayColor="#333"
          onPress={this.openSearch}
        >
          <Icon
            name="search"
            size={50}
            style={styles.menuButton}
          />
        </TouchableHighlight>
      </View>
    )
  }
}
