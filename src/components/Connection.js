import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

export default class Connection extends Component {
  static propTypes = {
    onConnect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      hostname: '',
      port: '3000',
      username: '',
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('username').then(username => username && this.setState({ username }))
    AsyncStorage.getItem('hostname').then(hostname => hostname && this.setState({ hostname }))
    AsyncStorage.getItem('port').then(port => port && this.setState({ port }))
  }

  connect = () => {
    this.setState({ isLoading: true }, () => {
      let { hostname, port = '80', username } = this.state
      hostname = hostname.trim()
      port = port.trim()
      username = username.trim()
      if (!username) return this.setState({ message: 'Gimme an username', isLoading: false })
      if (!hostname) return this.setState({ message: 'Gimme a hostname', isLoading: false })
      const url = `http://${hostname}:${port}`
      AsyncStorage.setItem('username', username)
      AsyncStorage.setItem('hostname', hostname)
      AsyncStorage.setItem('port', port)
      fetch(url.concat('/contents'))
        .then(response => response.json())
        .then(contents => this.props.onConnect({ contents, hostname, port, url, username }))
        .catch(({ message }) => this.setState({ message, isLoading: false }))
    })
  }

  setHostName = hostname => this.setState({ hostname })

  setPort = port => this.setState({ port })

  setUserName = username => this.setState({ username })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Karakuri</Text>
        </View>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          onChangeText={this.setUserName}
          placeholder="Enter a username"
          value={this.state.username}
        />

        <Text style={styles.label}>Hostname:</Text>
        <TextInput
          onChangeText={this.setHostName}
          placeholder="Enter a hostname"
          value={this.state.hostname}
        />

        <Text style={styles.label}>Port:</Text>
        <TextInput
          onChangeText={this.setPort}
          placeholder="Enter a port"
          value={this.state.port}
        />

        <Button
          isLoading={this.state.isLoading}
          onPress={this.connect}
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
