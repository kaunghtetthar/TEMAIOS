//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'
import PropTypes from 'prop-types';


const VDLView = requireNativeComponent('VDLView', null)

export default class VDLViewView extends Component {
  render () {
    return <VDLView {...this.props} />
  }
}

VDLView.propTypes = {
  exampleProp: PropTypes.string
}
// module.exports = requireNativeComponent('VDLView', null);
