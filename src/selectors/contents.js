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
    // Optimization: while it would be cleaner not to modify the object we're given in arguments,
    // Cloning it via Object spreading on each iteration has a really bad performance impact.
    // And it only impacts the object we're currently building > no consequence.
    return Object.assign(obj, { [dirName]: directoryContents.concat(content) })
  }, {}),
)

const getContentsPerGroups = createSelector([getAllContents], contents =>
  contents.reduce(
    // Optimization: while it would be cleaner not to modify the object we're given in arguments,
    // Cloning it via Object spreading on each iteration has a really bad performance impact.
    // And it only impacts the object we're currently building > no consequence.
    (obj, content) =>
      Object.assign(obj, { [content.group]: (obj[content.group] || []).concat(content) }),
    {},
  ),
)

const getGroups = createSelector([getContentsPerDirectories], contentsPerDirectories =>
  Object.keys(contentsPerDirectories).reduce(
    // Optimization: while it would be cleaner not to modify the object we're given in arguments,
    // Cloning it via Object spreading on each iteration has a really bad performance impact.
    // And it only impacts the object we're currently building > no consequence.
    (directoriesObj, dirName) =>
      Object.assign(directoriesObj, {
        [dirName]: uniq(contentsPerDirectories[dirName].map(content => content.group)),
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

export const getCurrentDirectoryGroups = createSelector(
  [getGroups, getCurrentDirectoryName, getDirectories],
  (groups, directoryName, directories) =>
    directoryName ? groups[directoryName] : groups[first(directories)],
)

export const getCurrentGroupContents = createSelector(
  [getContentsPerGroups, getCurrentGroupName, getFavorites],
  (contentsPerGroups, groupName, favorites) =>
    getAugmentedContents(contentsPerGroups[groupName], favorites),
)

const getSelectedContentId = state => state.contents.contentId

export const getSelectedAugmentedContent = createSelector(
  [getAllAugmentedContents, getSelectedContentId],
  (augmentedContents, contentId) => augmentedContents.find(c => c.id === contentId),
)

export const isSelectedContentInMyPlaylist = createSelector(
  [getSelectedContentId, getMyPlaylistContents],
  (contentId, contents) => contents.some(({ id }) => id === contentId),
)

export const isSelectedContentPlaying = createSelector(
  [getSelectedContentId, getPlayingContent],
  (contentId, content) => !!content && content.id === contentId,
)
