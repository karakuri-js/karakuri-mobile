import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Button from 'apsl-react-native-button'
import { ContentsList } from './ContentsList'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272822',
    flex: 1,
  },
  listContainer: {
    flex: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
})

export class Playlist extends Component {
  static propTypes = {
    contents: PropTypes.array,
    handleRandomize: PropTypes.func,
  }

  static defaultProps = { contents: [], handleRandomize: () => {} }

  render() {
    const { contents } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ContentsList
            contents={contents}
            title="My Playlist"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.handleRandomize}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            Randomize
          </Button>
        </View>
      </View>
    )
  }
}
