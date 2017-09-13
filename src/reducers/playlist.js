import { PLAYLIST_UPDATE } from '../constants/actionTypes'

const initialState = {
  playlistContents: [],
  playingContent: null,
}

export default function playlist(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_UPDATE:
      return {
        ...state,
        playingContent: action.playingContent,
        playlistContents: action.playlistContents,
      }

    default:
      return state
  }
}
