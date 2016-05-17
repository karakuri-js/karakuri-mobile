import React, { Component } from 'react'
import { Connection } from './components/Connection'
import { HomeTabs } from './components/HomeTabs'

export default class Karakuri extends Component {
  constructor(props) {
    super(props)
    this.state = { isConnected: false }
  }

  render() {
    return (
      this.state.isConnected ?
        <HomeTabs {...this.state} /> :
        <Connection onConnect={params => this.setState({ ...params, isConnected: true })} />
    )
  }
}
