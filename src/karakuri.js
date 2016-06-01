import React, { Component } from 'react'
import { Connection } from './components/Connection'
import { Home } from './components/Home'

export default class Karakuri extends Component {
  constructor(props) {
    super(props)
    this.state = { isConnected: false }
  }

  render() {
    return (
      this.state.isConnected ?
        <Home {...this.state} /> :
        <Connection onConnect={params => this.setState({ ...params, isConnected: true })} />
    )
  }
}
