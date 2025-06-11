const isWord = require('is-word')
const validWord = isWord('american-english')

function getDuplicates(arr) {
  const newArr = []
  const result = []

  for (let i = 0; i < arr.length; i++) {
    if (newArr.includes(arr[i]) && !result.includes(arr[i])) {
      result.push(arr[i])
      continue
    }

    newArr.push(arr[i])
  }

  return result
}

function scoreTally(tallyResult) {
  // const output = { result: [], score: 0, id, name }
  // output.result.push({ word, valid: isValid, unique: isUnique })
  // tallyResult.push({ foundWords, id: socket.id, name: playerName })
  const newResult = []
  const validWords = []

  for (let i = 0; i < tallyResult.length; i++) {
    const { name, id, foundWords } = tallyResult[i]

    const output = { result: [], score: 0, id, name }

    for (let j = 0; j < foundWords.length; j++) {
      const word = foundWords[j]
      const isValid = validWord.check(word.toLowerCase())

      if (isValid) validWords.push(word)

      output.result.push({ word, valid: isValid, unique: true })
    }

    newResult.push(output)
  }

  const dupes = getDuplicates(validWords)

  for (let i = 0; i < newResult.length; i++) {
    const { result } = newResult[i]

    for (let j = 0; j < result.length; j++) {
      const { word, valid } = result[j]

      if (!valid) continue

      if (dupes.includes(word)) {
        newResult[i].result[j].unique = false
        continue
      }

      newResult[i].score += word.length - 2
    }
  }

  newResult.sort((a, b) => b.score - a.score)

  return newResult
}

// const data = scoreTally([
//   { foundWords: ['zip', 'fart', 'like'], id: 'sfss', name: 'more' },
//   { foundWords: ['end', 'zip', 'like', 'goose'], id: 'sfs', name: 'morgan' },
// ])

// console.log(data)

module.exports = {
  scoreTally,
}
