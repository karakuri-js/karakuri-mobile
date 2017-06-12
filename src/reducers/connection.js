import { CONNECTION_REQUEST, CONNECTION_SUCCESS, CONNECTION_FAILURE } from '../constants/actionTypes'

const initialState = { isLoading: false }

export default function connection(state = initialState, action) {
  switch (action.type) {
    case CONNECTION_SUCCESS:
      return {
        username: action.username,
        hostname: action.hostname,
        port: action.port,
        url: action.url,
        isLoading: false,
      }

    case CONNECTION_REQUEST:
      return {
        isLoading: true,
      }

    case CONNECTION_FAILURE:
      return {
        isLoading: false,
        errorMessage: action.errorMessage,
      }

    default:
      return state
  }
}
