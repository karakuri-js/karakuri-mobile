import { combineReducers } from 'redux'

import connection from './connection'
import contents from './contents'
import favorites from './favorites'
import history from './history'
import navigation from './navigation'
import playlist from './playlist'

export default combineReducers({
  connection,
  contents,
  favorites,
  history,
  playlist,
  navigation,
})
