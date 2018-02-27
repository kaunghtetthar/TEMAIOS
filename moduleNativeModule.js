//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { module } = NativeModules

export default {
  exampleMethod () {
    return module.exampleMethod()
  },

  EXAMPLE_CONSTANT: module.EXAMPLE_CONSTANT
}
