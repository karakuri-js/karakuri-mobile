import { PLAYLIST_UPDATE } from '../constants/actionTypes'

const initialState = {
  playlistContents: [],
  myPlaylistContents: [],
  playingContent: null,
}

export default function playlist(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_UPDATE:
      return {
        ...state,
        playingContent: action.playingContent,
        playlistContents: action.playlistContents,
        myPlaylistContents: action.myPlaylistContents,
      }

    default:
      return state
  }
}
