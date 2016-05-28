export const getContentsPerDirectories = contents => contents.reduce((obj, content) => {
  const { dirName } = content
  const directoryContents = obj[content.dirName] || []
  return {
    ...obj,
    [dirName]: directoryContents.concat(content),
  }
}, {})

export const getContentsPerFirstLetters = contents => contents.reduce((obj, content) => ({
  ...obj,
  [content.fileName[0].toUpperCase()]: (obj[content.fileName[0]] || []).concat(content)
}), {})
