import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  button: {
    padding: 10,
    backgroundColor: '#99c9f4',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
  },
  errorMessage: {
    color: 'red',
  },
})

export class Connection extends Component {
  static propTypes = {
    onConnect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  connect() {
    const host = this.state.text.trim()
    if (!host) return this.setState({ message: 'Gimme an host' })
    const url = `http://${host}:3000`
    fetch(url.concat('/contents'))
      .then(response => response.json())
      .then(contents => this.props.onConnect({ contents, url }))
      .catch(({ message }) => this.setState({ message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Karakuri</Text>
        </View>

        <TextInput
          onChangeText={text => this.setState({ text })}
          placeholder="Enter a hostname"
          value={this.state.text}
        />

        <TouchableHighlight
          onPress={() => this.connect()}
          underlayColor="#99d9f4"
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Connect
            </Text>
          </View>
        </TouchableHighlight>

        <Text style={styles.errorMessage}>{this.state.message}</Text>
      </View>
    )
  }
}
