import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { selectContent } from '../actions'
import { CONTENT_SCREEN } from '../constants/screens'

export const provideGoToContentScreen = ChildComponent =>
  connect(null, { selectContent })(
    class extends Component {
      static propTypes = {
        selectContent: PropTypes.func.isRequired,
        navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
      }

      goToContentScreen = content => {
        this.props.selectContent(content.id)
        this.props.navigation.navigate(CONTENT_SCREEN)
      }

      render() {
        return <ChildComponent {...this.props} goToContentScreen={this.goToContentScreen} />
      }
    },
  )
