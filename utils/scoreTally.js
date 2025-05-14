const isWord = require('is-word')
const validWord = isWord('american-english')

function scoreTally(foundWords, id, name) {
  const output = { result: [], score: 0, id, name }

  for (let i = 0; i < foundWords.length; i++) {
    const word = foundWords[i].toLowerCase()
    const isValid = validWord.check(word)
    output.result.push({ word, valid: isValid })

    if (isValid) output.score += foundWords[i].length - 2
  }

  return output
}

module.exports = {
  scoreTally,
}
