import { createSelector } from 'reselect'
import { first, uniq } from 'lodash'

export const getAllContents = state =>
  state.contents.allContents.map(content => ({
    ...content,
    isFavorite: state.favorites[content.id],
  }))

const getCurrentDirectoryName = state => state.contents.directoryName
export const getCurrentGroupName = state => state.contents.groupName

const getContentsPerDirectories = createSelector([getAllContents], contents =>
  contents.reduce((obj, content) => {
    const { dirName } = content
    const directoryContents = obj[content.dirName] || []
    return {
      ...obj,
      [dirName]: directoryContents.concat(content),
    }
  }, {}),
)

const getContentsPerGroups = createSelector([getAllContents], contents =>
  contents.reduce(
    (obj, content) => ({
      ...obj,
      [content.group]: (obj[content.group] || []).concat(content),
    }),
    {},
  ),
)

const getGroupsPerLettersAndDirectories = createSelector(
  [getContentsPerDirectories],
  contentsPerDirectories =>
    Object.keys(contentsPerDirectories).reduce(
      (directoriesObj, dirName) => ({
        ...directoriesObj,
        [dirName]: contentsPerDirectories[dirName]
          .map(content => content.group)
          .reduce((alphabetListObj, groupName) => {
            const letter = groupName[0].toUpperCase()
            return {
              ...alphabetListObj,
              [letter]: uniq((alphabetListObj[letter] || []).concat(groupName)),
            }
          }, {}),
      }),
      {},
    ),
)

export const getDirectories = createSelector([getContentsPerDirectories], contentsPerDirectories =>
  Object.keys(contentsPerDirectories).sort(
    (c1, c2) => (c1.toLowerCase() > c2.toLowerCase() ? 1 : -1),
  ),
)

export const getFavoritesContents = createSelector([getAllContents], contents =>
  contents.filter(c => c.isFavorite),
)

export const getCurrentDirectoryGroupsPerLetter = createSelector(
  [getGroupsPerLettersAndDirectories, getCurrentDirectoryName, getDirectories],
  (groupsPerLettersAndDirectories, directoryName, directories) =>
    directoryName
      ? groupsPerLettersAndDirectories[directoryName]
      : groupsPerLettersAndDirectories[first(directories)],
)

export const getCurrentGroupContents = createSelector(
  [getContentsPerGroups, getCurrentGroupName],
  (contentsPerGroups, groupName) => contentsPerGroups[groupName],
)
