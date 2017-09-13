import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CONTENT_SCREEN } from '../constants/screens'

export const provideGoToContentScreen = ChildComponent =>
  class extends Component {
    static propTypes = {
      navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
    }

    goToContentScreen = id => this.props.navigation.navigate(CONTENT_SCREEN, { id })

    render() {
      return <ChildComponent {...this.props} goToContentScreen={this.goToContentScreen} />
    }
  }
