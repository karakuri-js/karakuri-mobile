import { MainNavigator } from '../navigation/MainNavigator'

const initialState = MainNavigator.router.getStateForAction({}, null)

export default function navReducer(state = initialState, action) {
  const newState = MainNavigator.router.getStateForAction(action, state)
  return newState || state
}
