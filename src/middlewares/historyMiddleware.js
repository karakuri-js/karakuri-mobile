import { AsyncStorage } from 'react-native'
import {
  CONNECTION_SUCCESS,
  HISTORY_LOADED,
  PLAYLIST_ADDITION_SUCCESS,
} from '../constants/actionTypes'
import { getHistoryKey } from '../lib/storageUtils'

const loadHistory = username =>
  AsyncStorage.getItem(getHistoryKey(username))
    .then(historyString => JSON.parse(historyString) || {})
    .then(history =>
      // Convert all dates stored in string in the object to proper dates.
      Object.keys(history).reduce((prev, id) => ({ ...prev, [id]: new Date(history[id]) }), {}),
    )

const historyMiddleware = store => next => action => {
  const result = next(action)
  if (action.type === CONNECTION_SUCCESS) {
    loadHistory(action.username)
      .then(history =>
        store.dispatch({
          type: HISTORY_LOADED,
          history,
        }),
      )
      .catch(e => console.error(e))
  }

  if (action.type === PLAYLIST_ADDITION_SUCCESS) {
    const { connection: { username }, history } = store.getState()
    const updatedHistory = { ...history, [action.id]: new Date() }
    AsyncStorage.setItem(getHistoryKey(username), JSON.stringify(updatedHistory))
    store.dispatch({
      type: HISTORY_LOADED,
      history: updatedHistory,
    })
  }

  return result
}

export default historyMiddleware
