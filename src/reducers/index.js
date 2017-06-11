import { combineReducers } from 'redux'

import authentication from './authentication'
import karaoke from './karaoke'
import playlist from './playlist'

export default combineReducers({
  authentication,
  karaoke,
  playlist,
})
