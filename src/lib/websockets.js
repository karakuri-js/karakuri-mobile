import { updateLocalPlaylist, updatePlayingContent } from '../actions'

export const handleWebsocketsConnection = (dispatch, getState) => {
  const { hostname, port } = getState().connection
  const ws = new WebSocket(`ws://${hostname}:${port}`)

  ws.onmessage = ({ data }) => {
    if (!data) return
    const { type, payload } = JSON.parse(data)
    if (type === 'playlist') return dispatch(updateLocalPlaylist(payload))
    if (type === 'playingContent') {
      return dispatch(updatePlayingContent(payload))
    }
  }
  // Always try to reconnect if we've lost the connection
  ws.onclose = () => setTimeout(() => handleWebsocketsConnection(), 10000)
}
