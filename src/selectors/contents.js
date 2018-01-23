import { createSelector } from 'reselect'
import { first, uniq } from 'lodash'

const getAugmentedContent = (content, favorites, history) => ({
  ...content,
  isFavorite: favorites[content.id],
  lastPlayed: history[content.id],
})

const getAugmentedContents = (contents, favorites, history) =>
  contents.map(content => getAugmentedContent(content, favorites, history))

export const getAllContents = state => state.contents.allContents
export const getFavorites = state => state.favorites
export const getHistory = state => state.history

export const getAllAugmentedContents = createSelector(
  [getAllContents, getFavorites, getHistory],
  (allContents, favorites, history) => getAugmentedContents(allContents, favorites, history),
)
const getUsername = state => state.connection.username
const getCurrentDirectoryName = state => state.contents.directoryName
export const getCurrentGroupName = state => state.contents.groupName

const getPlaylistContents = state => state.playlist.playlistContents
export const getPlaylistContentsNumber = createSelector(
  [getPlaylistContents],
  contents => contents.length,
)

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

export const getFavoritesContents = createSelector(
  [getAllContents, getFavorites, getHistory],
  (contents, favorites, history) =>
    getAugmentedContents(contents.filter(content => favorites[content.id]), favorites, history),
)

export const getHistoryContents = createSelector(
  [getAllContents, getFavorites, getHistory],
  (contents, favorites, history) =>
    getAugmentedContents(contents.filter(content => history[content.id])).sort(
      (c1, c2) => (c1.lastPlayed > c2.lastPlayed ? -1 : 1),
      favorites,
      history,
    ),
)

const getPlayingContent = state => state.playlist.playingContent

export const getAugmentedPlayingContent = createSelector(
  [getPlayingContent, getFavorites, getHistory],
  (content, favorites, history) => content && getAugmentedContent(content, favorites, history),
)

export const getMyPlaylistContents = createSelector(
  [getPlaylistContents, getUsername, getFavorites, getHistory],
  (contents, username, favorites, history) =>
    getAugmentedContents(contents.filter(c => c.username === username), favorites, history),
)

export const getCurrentDirectoryGroupsPerLetter = createSelector(
  [getGroupsPerLettersAndDirectories, getCurrentDirectoryName, getDirectories],
  (groupsPerLettersAndDirectories, directoryName, directories) =>
    directoryName
      ? groupsPerLettersAndDirectories[directoryName]
      : groupsPerLettersAndDirectories[first(directories)],
)

export const getCurrentGroupContents = createSelector(
  [getContentsPerGroups, getCurrentGroupName, getFavorites, getHistory],
  (contentsPerGroups, groupName, favorites, history) =>
    getAugmentedContents(contentsPerGroups[groupName], favorites, history),
)
