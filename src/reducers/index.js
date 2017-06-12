import { combineReducers } from 'redux'

import connection from './connection'
import contents from './contents'
import playlist from './playlist'

export default combineReducers({
  connection,
  contents,
  playlist,
})
