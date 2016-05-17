import React, { Component, PropTypes } from 'react'
import { Text, TouchableHighlight, View } from 'react-native'

export class ContentRow extends Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    content: PropTypes.shape({ id: PropTypes.number }),
  }

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.addToPlaylist(this.props.content.id)
  }

  render() {
    const { content } = this.props
    return (
      <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24 }}>
            {content.group} - {content.type} - {content.songName}
          </Text>
        </View>
        <TouchableHighlight onPress={this.onPress}>
          <View>
            <Text style={{ fontSize: 48 }}>+</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
