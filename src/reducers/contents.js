import { uniq } from 'lodash'
import { CONTENTS_LOADED, SELECT_DIRECTORY, SELECT_GROUP } from '../constants/actionTypes'
import { getContentsPerDirectories, getContentsPerGroups } from '../lib/contentsFormatter'

const initialState = { allContents: [], directoryContents: [], groupContents: [], selectedGroupName: '' }

export default function contents(state = initialState, action) {
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
        groupContents: [],
        selectedGroupName: '',
      }
    }

    case SELECT_DIRECTORY:
      return {
        ...state,
        selectedDirectoryName: action.directoryName,
        directoryGroups: state.groupsPerLettersAndDirectories[action.directoryName],
      }

    case SELECT_GROUP:
      return {
        ...state,
        selectedGroupName: action.groupName,
        groupContents: state.contentsPerGroups[action.groupName],
      }


    default:
      return state
  }
}
