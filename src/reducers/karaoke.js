import { uniq } from 'lodash'
import { CONTENTS_LOADED, SELECT_DIRECTORY } from '../constants/actionTypes'
import { getContentsPerDirectories, getContentsPerGroups } from '../lib/contentsFormatter'

const initialState = { contents: [], directoryContents: [], groupContents: [] }

export default function karaoke(state = initialState, action) {
  switch (action.type) {
    case CONTENTS_LOADED: {
      const { contents } = action
      // Group contents per directory & groups, then create listview datasources
      const contentsPerDirectories = getContentsPerDirectories(contents)
      const contentsPerGroups = getContentsPerGroups(contents)
      const groupsPerLettersAndDirectories = Object.keys(contentsPerDirectories).reduce(
        (directoriesObj, dirName) => ({
          ...directoriesObj,
          [dirName]: contentsPerDirectories[dirName].map(content => content.group).reduce(
            (alphabetListObj, groupName) => {
              const letter = groupName[0].toUpperCase()
              return {
                ...alphabetListObj,
                [letter]: uniq((alphabetListObj[letter] || []).concat(groupName)),
              }
            },
            {},
          ),
        }),
        {},
      )

      const directories = Object.keys(contentsPerDirectories)
      const selectedDirectoryName = directories[0]

      return {
        allContents: contents,
        directories: Object.keys(contentsPerDirectories),
        contentsPerGroups,
        groupsPerLettersAndDirectories,
        selectedDirectoryName,
        directoryGroups: groupsPerLettersAndDirectories[selectedDirectoryName],
      }
    }

    case SELECT_DIRECTORY:
      return {
        ...state,
        selectedDirectoryName: action.directoryName,
        directoryGroups: state.groupsPerLettersAndDirectories[action.directoryName],
      }

    default:
      return state
  }
}
