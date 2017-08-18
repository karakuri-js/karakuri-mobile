import React, { Component } from 'react'
import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    opacity: 0.62,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
})

/* Material design specs - https://material.io/guidelines/patterns/navigation-drawer.html#navigation-drawer-specs */
const activeTintColor = '#2196f3'
const activeBackgroundColor = 'rgba(0, 0, 0, .04)'
const inactiveTintColor = 'rgba(0, 0, 0, .87)'
const inactiveBackgroundColor = 'transparent'

class DrawerItem extends Component {
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    icon: PropTypes.node,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  static defaultProps = {
    icon: null,
  }

  onPress = () => this.props.onPress(this.props.id)

  render() {
    const { label, isFocused, icon } = this.props
    const color = isFocused ? activeTintColor : inactiveTintColor
    const backgroundColor = isFocused ? activeBackgroundColor : inactiveBackgroundColor
    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View style={[styles.item, { backgroundColor }]}>
          {icon &&
            <View style={[styles.icon, isFocused ? null : styles.inactiveIcon]}>
              {icon}
            </View>}
          <Text style={[styles.label, { color }]}>
            {label}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default DrawerItem
