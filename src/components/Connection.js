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
  label: {
    color: '#000',
    fontWeight: 'bold',
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
    this.state = { hostname: '', port: '3000' }
  }

  connect() {
    const { hostname, port = '80' } = this.state
    if (!hostname) return this.setState({ message: 'Gimme an hostname' })
    const url = `http://${hostname.trim()}:${port.trim()}`
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

        <Text style={styles.label}>Hostname:</Text>
        <TextInput
          onChangeText={hostname => this.setState({ hostname })}
          placeholder="Enter a hostname"
          value={this.state.hostname}
        />

        <Text style={styles.label}>Port:</Text>
        <TextInput
          onChangeText={text => this.setState({ text })}
          placeholder="Enter a port"
          value={this.state.port}
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
