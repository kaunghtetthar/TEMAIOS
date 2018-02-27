//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'
import PropTypes from 'prop-types';

const VDLViewController = requireNativeComponent('VDLViewController', VDLViewControllerView)

export default class VDLViewControllerView extends Component {
  render () {
    return <VDLViewController {...this.props} />
  }
}

VDLViewControllerView.propTypes = {
  exampleProp: PropTypes.string
}
