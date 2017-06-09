import { combineReducers } from 'redux'

import authentication from './authentication'
import karaoke from './karaoke'

export default combineReducers({
  authentication,
  karaoke,
})
