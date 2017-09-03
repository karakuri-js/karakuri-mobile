import { combineReducers } from 'redux'

import connection from './connection'
import contents from './contents'
import favorites from './favorites'
import navigation from './navigation'
import playlist from './playlist'

export default combineReducers({
  connection,
  contents,
  favorites,
  playlist,
  navigation,
})
