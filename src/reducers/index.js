import { combineReducers } from 'redux'

import connection from './connection'
import contents from './contents'
import navigation from './navigation'
import playlist from './playlist'

export default combineReducers({
  connection,
  contents,
  playlist,
  navigation,
})
