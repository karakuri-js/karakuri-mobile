import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage, StyleSheet, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'
import Button from 'apsl-react-native-button'

import { connectToServer } from '../actions'
import { MAIN_SCREEN } from '../constants/screens'

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
    fontSize: 18,
    color: 'white',
  },
  errorMessage: {
    color: 'red',
  },
})

export class ConnectionScreen extends Component {
  static propTypes = {
    connectToServer: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    isLoading: false,
    errorMessage: '',
  }

  constructor(props) {
    super(props)
    this.state = {
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
    let { hostname, port = '80', username } = this.state
    hostname = hostname.trim()
    port = port.trim()
    username = username.trim()
    if (!username) return this.setState({ message: 'Gimme an username', isLoading: false })
    if (!hostname) return this.setState({ message: 'Gimme a hostname', isLoading: false })
    AsyncStorage.setItem('username', username)
    AsyncStorage.setItem('hostname', hostname)
    AsyncStorage.setItem('port', port)
    return this.props
      .connectToServer({ hostname, port, username })
      .then(() => this.props.navigation.navigate(MAIN_SCREEN))
      .catch(() => {})
  }

  setHostName = hostname => this.setState({ hostname })

  setPort = port => this.setState({ port })

  setUserName = username => this.setState({ username })

  render() {
    const { isLoading, errorMessage } = this.props
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
        <TextInput onChangeText={this.setPort} placeholder="Enter a port" value={this.state.port} />

        <Button
          isLoading={isLoading}
          onPress={this.connect}
          style={styles.button}
          textStyle={styles.buttonText}
        >
          Connect
        </Button>

        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    )
  }
}

export default connect(
  ({ connection: { isLoading, errorMessage } }) => ({ isLoading, errorMessage }),
  { connectToServer },
)(ConnectionScreen)
