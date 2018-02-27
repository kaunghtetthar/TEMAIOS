//  Created by react-native-create-bridge

import { NativeModules, NativeEventEmitter } from 'react-native'

const { VDLViewManager } = NativeModules
const VDLViewManagerEmitter = new NativeEventEmitter(VDLViewManager)

export default {
  gopagetwo () {
    return VDLViewManager.gopagetwo('http://localhost/test/video.avi')
  },

  emitter: VDLViewManagerEmitter,
  EXAMPLE_EVENT: VDLViewManager.EXAMPLE_EVENT
}
