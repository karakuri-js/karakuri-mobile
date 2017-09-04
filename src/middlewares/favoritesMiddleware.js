import { AsyncStorage } from 'react-native'
import { CONNECTION_SUCCESS, FAVORITES_LOADED, TOGGLE_FAVORITE } from '../constants/actionTypes'
import { getFavoritesKey } from '../lib/storageUtils'

const favoritesMiddleware = store => next => action => {
  const result = next(action)

  if (action.type === CONNECTION_SUCCESS) {
    AsyncStorage.getItem(getFavoritesKey(action.username)).then(favoritesString => {
      try {
        const favorites = JSON.parse(favoritesString)
        store.dispatch({
          type: FAVORITES_LOADED,
          favorites,
        })
      } catch (e) {
        console.error(e)
      }
    })
  }

  if (action.type === TOGGLE_FAVORITE) {
    const { connection: { username }, favorites } = store.getState()
    AsyncStorage.setItem(getFavoritesKey(username), JSON.stringify(favorites))
  }

  return result
}

export default favoritesMiddleware
