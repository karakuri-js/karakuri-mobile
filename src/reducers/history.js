import { HISTORY_LOADED } from '../constants/actionTypes'

const initialState = {}

export default function contents(state = initialState, action) {
  switch (action.type) {
    case HISTORY_LOADED: {
      return action.history
    }

    default:
      return state
  }
}
