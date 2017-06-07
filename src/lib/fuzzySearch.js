const escapeRegExp = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

const fuzzySearch = (array, string, lookedUpProperty = false) => {
  const words = string.split(' ')
  const regexes = words.map(word => new RegExp(`(${escapeRegExp(word)})`, 'ig'))
  const result = array.reduce(
    (acc, item) => {
      const itemValue = lookedUpProperty ? item[lookedUpProperty] : item
      return regexes.some(regex => !itemValue.match(regex)) ? acc : acc.concat(item)
    },
    [],
  )
  return { result, regexes }
}

module.exports = fuzzySearch
