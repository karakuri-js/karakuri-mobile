import React, { Component, PropTypes } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import Button from 'apsl-react-native-button'

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
    backgroundColor: '#0D1011',
  },
  buttonText: {
    fontSize: 18, color: 'white',
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
    this.state = { hostname: '', port: '3000', isLoading: false }
  }

  componentWillMount() {
    AsyncStorage.getItem('hostname').then(hostname => hostname && this.setState({ hostname }))
    AsyncStorage.getItem('port').then(port => port && this.setState({ port }))
  }

  connect() {
    const { hostname, port = '80' } = this.state
    if (!hostname) return this.setState({ message: 'Gimme an hostname', isLoading: false })
    const url = `http://${hostname.trim()}:${port.trim()}`
    AsyncStorage.setItem('hostname', hostname)
    AsyncStorage.setItem('port', port)
    fetch(url.concat('/contents'))
      .then(response => response.json())
      .then(contents => this.props.onConnect({ contents, url }))
      .catch(({ message }) => this.setState({ message, isLoading: false }))
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
          onChangeText={port => this.setState({ port })}
          placeholder="Enter a port"
          value={this.state.port}
        />

        <Button
          isLoading={this.state.isLoading}
          onPress={() => this.setState({ isLoading: true }, () => this.connect())}
          style={styles.button}
          textStyle={styles.buttonText}
        >
          Connect
        </Button>

        <Text style={styles.errorMessage}>{this.state.message}</Text>
      </View>
    )
  }
}
