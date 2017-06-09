import * as types from '../constants/actionTypes'

export const login = ({ username, hostname, port }) => dispatch => {
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
    })
    .catch(message => {
      dispatch({
        type: types.LOGIN_FAILED,
        message,
      })
    })
}

export const addToPlaylist = () => (dispatch, getState) => {}

export const updateLocalPlaylist = () => (dispatch, getState) => {}
