import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import favoritesMiddleware from '../middlewares/favoritesMiddleware'
import historyMiddleware from '../middlewares/historyMiddleware'

const configureStore = () =>
  createStore(rootReducer, {}, applyMiddleware(thunk, favoritesMiddleware, historyMiddleware))

export default configureStore
