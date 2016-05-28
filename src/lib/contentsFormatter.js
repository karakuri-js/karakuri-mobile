export const getContentsPerDirectories = contents => contents.reduce((obj, content) => {
  const { dirName } = content
  const directoryContents = obj[content.dirName] || []
  return {
    ...obj,
    [dirName]: directoryContents.concat(content),
  }
}, {})
