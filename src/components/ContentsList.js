import React from 'react'
import PropTypes from 'prop-types'
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
    contents: PropTypes.array,
    hideGroups: PropTypes.bool,
    onSelect: PropTypes.func,
    title: PropTypes.string,
  }

  static defaultProps = { contents: [], title: '' }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
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
            content => (
              <ContentRow
                {...content}
                onSelect={this.props.onSelect}
                hideGroup={this.props.hideGroups}
              />
            )
          }
        />
      </View>
    )
  }
}
