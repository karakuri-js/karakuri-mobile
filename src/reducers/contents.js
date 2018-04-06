import { NavigationActions } from 'react-navigation'

import { CONTENTS_LOADED, SELECT_DIRECTORY, SELECT_GROUP } from '../constants/actionTypes'

import { CONTENT_SCREEN, REPORT_SCREEN } from '../constants/screens'

const initialState = {
  allContents: [],
  directoryName: '',
  groupName: '',
}

export default function contents(state = initialState, action) {
  switch (action.type) {
    case CONTENTS_LOADED: {
      return {
        ...state,
        allContents: action.contents,
      }
    }

    case SELECT_DIRECTORY:
      return {
        ...state,
        directoryName: action.directoryName,
      }

    case SELECT_GROUP:
      return {
        ...state,
        groupName: action.groupName,
      }

    case NavigationActions.NAVIGATE:
      if (action.routeName !== CONTENT_SCREEN && action.routeName !== REPORT_SCREEN) return state
      return {
        ...state,
        contentId: action.params.contentId,
      }

    default:
      return state
  }
}
