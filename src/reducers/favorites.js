import { FAVORITES_LOADED, TOGGLE_FAVORITE } from '../constants/actionTypes'

const initialState = {}

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case FAVORITES_LOADED:
      return {
        ...action.favorites,
      }

    case TOGGLE_FAVORITE:
      return {
        ...state,
        [action.contentId]: !state[action.contentId],
      }

    default:
      return state
  }
}
