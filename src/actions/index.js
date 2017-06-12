import { ToastAndroid } from 'react-native'
import * as types from '../constants/actionTypes'

import { handleWebsocketsConnection } from '../lib/websockets'

export const login = ({ username, hostname, port }) => (dispatch, getState) => {
  dispatch({ type: types.LOGIN_REQUEST })

  const url = `http://${hostname}:${port}`
  return fetch(url.concat('/contents'))
    .then(response => response.json())
    .then(contents => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        username,
        hostname,
        port,
        url,
      })
      dispatch({
        type: types.CONTENTS_LOADED,
        contents,
      })
      handleWebsocketsConnection(dispatch, getState)
    })
    .catch(err => {
      dispatch({
        type: types.LOGIN_FAILURE,
        errorMessage: err && err.toString(),
      })
      return Promise.reject() // To get the original promise to fail. FIXME?
    })
}

export const selectDirectory = directoryName => ({ type: types.SELECT_DIRECTORY, directoryName })
export const selectGroup = groupName => ({ type: types.SELECT_GROUP, groupName })

export const addToPlaylist = id => (dispatch, getState) => {
  const { url, username } = getState().authentication
  fetch(`${url}/request`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ id, username }),
  }).then(response => response.json())
    .then(({ message }) => {
      dispatch({ type: types.PLAYLIST_ADDITION_SUCCESS })
      ToastAndroid.show(message, ToastAndroid.LONG) // Could be handled in a middleware
    })
    .catch(err => {
      dispatch({ type: types.PLAYLIST_ADDITION_FAILURE })
      ToastAndroid.show(err.toString(), ToastAndroid.LONG) // Could be handled in a middleware
    })
}

export const updateLocalPlaylist = playlistContents => (dispatch, getState) => {
  const { authentication: { username: myUsername }, playlist: { playingContent } } = getState()
  const myPlaylistContents = playlistContents
    .filter(({ username }) => username === myUsername)
    .filter(({ id }) => id !== (playingContent || {}).id)
  dispatch({ type: types.PLAYLIST_UPDATE, myPlaylistContents, playlistContents })
}

export const updatePlayingContent = playingContent => ({
  type: types.PLAYING_CONTENT_UPDATE,
  playingContent,
})

export const randomizePlaylist = () => (dispatch, getState) => {
  const { url, username } = getState().authentication
  fetch(`${url}/randomize`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ username }),
  }).then(response => response.json())
      .then(({ message }) => ToastAndroid.show(message, ToastAndroid.SHORT))
      .catch(err => ToastAndroid.show(err.toString(), ToastAndroid.SHORT))
}
