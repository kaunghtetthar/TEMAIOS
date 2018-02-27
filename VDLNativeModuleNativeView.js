//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const VDLNativeModule = requireNativeComponent('VDLNativeModule', VDLNativeModuleView)

export default class VDLNativeModuleView extends Component {
  render () {
    return <VDLNativeModule {...this.props} />
  }
}

VDLNativeModuleView.propTypes = {
  exampleProp: React.PropTypes.any
}
