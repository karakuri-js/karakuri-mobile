import { createSelector } from 'reselect'
import { first, uniq } from 'lodash'

const prop = key => obj => obj[key]
// explicit checks for better performance
const isTrueIn = (container, pred) => obj => container[pred(obj)] === true
const existsIn = (container, pred) => obj => typeof container[pred(obj)] !== 'undefined'

const getAugmentedContent = (content, favorites) => ({
  ...content,
  isFavorite: favorites[content.id] || false,
})

const getAugmentedContents = (contents, favorites) =>
  contents.map(content => getAugmentedContent(content, favorites))

export const getAllContents = state => state.contents.allContents
export const getFavorites = state => state.favorites
export const getHistory = state => state.history

export const getAllAugmentedContents = createSelector(
  [getAllContents, getFavorites],
  (allContents, favorites) => getAugmentedContents(allContents, favorites),
)
const getUsername = state => state.connection.username
const getCurrentDirectoryName = state => state.contents.directoryName
export const getCurrentGroupName = state => state.contents.groupName

const getPlaylistContents = state => state.playlist.playlistContents
export const getPlaylistContentsNumber = createSelector(
  [getPlaylistContents],
  contents => contents.length,
)
const getMyPlaylistContents = createSelector(
  [getPlaylistContents, getUsername],
  (contents, username) => contents.filter(c => c.username === username),
)
export const getAugmentedMyPlaylistContents = createSelector(
  [getMyPlaylistContents, getFavorites],
  (contents, favorites) => getAugmentedContents(contents, favorites),
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

export const getAugmentedFavoriteContents = createSelector(
  [getAllContents, getFavorites],
  (contents, favorites) =>
    getAugmentedContents(contents.filter(isTrueIn(favorites, prop('id'))), favorites),
)

export const getAugmentedHistoryContents = createSelector(
  [getAllContents, getFavorites, getHistory],
  (contents, favorites, history) =>
    getAugmentedContents(
      contents
        .filter(existsIn(history, prop('id')))
        .sort((c1, c2) => (history[c1.id] > history[c2.id] ? -1 : 1)),
      favorites,
    ),
)

const getPlayingContent = state => state.playlist.playingContent

export const getAugmentedPlayingContent = createSelector(
  [getPlayingContent, getFavorites],
  (content, favorites) => content && getAugmentedContent(content, favorites),
)

export const getCurrentDirectoryGroupsPerLetter = createSelector(
  [getGroupsPerLettersAndDirectories, getCurrentDirectoryName, getDirectories],
  (groupsPerLettersAndDirectories, directoryName, directories) =>
    directoryName
      ? groupsPerLettersAndDirectories[directoryName]
      : groupsPerLettersAndDirectories[first(directories)],
)

export const getCurrentGroupContents = createSelector(
  [getContentsPerGroups, getCurrentGroupName, getFavorites],
  (contentsPerGroups, groupName, favorites) =>
    getAugmentedContents(contentsPerGroups[groupName], favorites),
)
