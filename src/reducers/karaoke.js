import { CONTENTS_LOADED } from '../constants/actionTypes'

const initialState = { contents: [] }

export default function karaoke(state = initialState, action) {
  switch (action.type) {
    case CONTENTS_LOADED:
      return {
        contents: action.contents,
      }

    default:
      return state
  }
}
