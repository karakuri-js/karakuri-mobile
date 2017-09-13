import { createSelector } from 'reselect'
import { first, uniq } from 'lodash'

const getAugmentedContents = (contents, favorites) =>
  contents.map(content => ({
    ...content,
    isFavorite: favorites[content.id],
  }))

export const getAllContents = state =>
  getAugmentedContents(state.contents.allContents, state.favorites)
const getUsername = state => state.connection.username
const getCurrentDirectoryName = state => state.contents.directoryName
export const getCurrentGroupName = state => state.contents.groupName

export const getPlaylistContents = state =>
  getAugmentedContents(state.playlist.playlistContents, state.favorites)

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

export const getPlayingContent = state => state.playlist.playingContent

export const getMyPlaylistContents = createSelector(
  [getPlaylistContents, getUsername],
  (contents, username) => contents.filter(c => c.username === username),
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
