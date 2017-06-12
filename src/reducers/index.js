import { combineReducers } from 'redux'

import connection from './connection'
import karaoke from './karaoke'
import playlist from './playlist'

export default combineReducers({
  connection,
  karaoke,
  playlist,
})
