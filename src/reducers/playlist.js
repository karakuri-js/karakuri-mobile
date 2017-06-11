import { PLAYLIST_UPDATE, PLAYING_CONTENT_UPDATE } from '../constants/actionTypes'

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
        playlistContents: action.playlistContents,
        // We want here all contents, except the currently playing one.
        myPlaylistContents: action.myPlaylistContents.filter(
          ({ id }) => (state.playingContent || {}).id !== id,
        ),
      }

    case PLAYING_CONTENT_UPDATE:
      return {
        ...state,
        playingContent: action.playingContent,
        // We want here all contents, except the currently playing one.
        myPlaylistContents: state.myPlaylistContents.filter(
          ({ id }) => action.playingContent.id !== id,
        ),
      }

    default:
      return state
  }
}
