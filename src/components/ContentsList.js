import React, { PropTypes } from 'react'
import { ListView, StyleSheet, Text, View } from 'react-native'

import { ContentRow } from './ContentRow'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export class ContentsList extends React.Component {
  static propTypes = {
    addToPlaylist: PropTypes.func.isRequired,
    contents: PropTypes.array,
    title: PropTypes.string,
  }

  static defaultProps = { contents: [], title: '' }

  constructor(props) {
    super(props)
    this.addToPlaylist = this.addToPlaylist.bind(this)
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  addToPlaylist() {
    this.props.addToPlaylist()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} elevation={10}>
          <Text
            numberOfLines={1}
            style={styles.headerText}
          >
            {this.props.title}
          </Text>
        </View>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.props.contents)}
          renderRow={
            content => <ContentRow {...content} addToPlaylist={this.props.addToPlaylist} />
          }
        />
      </View>
    )
  }
}
