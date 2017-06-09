import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/actionTypes'

const initialState = { isLoading: false }

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        username: action.username,
        hostname: action.hostname,
        port: action.port,
        url: action.url,
        isLoading: false,
      }

    case LOGIN_REQUEST:
      return {
        isLoading: true,
      }

    case LOGIN_FAILURE:
      return {
        isLoading: false,
        errorMessage: action.errorMessage,
      }

    default:
      return state
  }
}
