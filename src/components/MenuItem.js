import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  item: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
})

export class MenuItem extends Component {
  static propTypes = {
    directory: PropTypes.string.isRequired,
    onDirectorySelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.onDirectorySelect = this.onDirectorySelect.bind(this)
  }

  onDirectorySelect() {
    this.props.onDirectorySelect(this.props.directory)
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.onDirectorySelect}
        underlayColor="#b5b5b5"
      >
        <View style={styles.container}>
          <Text style={styles.item}>
            {this.props.directory}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
