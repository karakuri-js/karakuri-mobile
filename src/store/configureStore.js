import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import favoritesMiddleware from '../middlewares/favoritesMiddleware'

const configureStore = () =>
  createStore(rootReducer, {}, applyMiddleware(thunk, favoritesMiddleware))

export default configureStore
