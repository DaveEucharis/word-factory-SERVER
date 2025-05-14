const wordFactoryArray = [
  ['M', 'T', 'T', 'I', 'E', 'T'],
  ['D', 'L', 'H', 'O', 'R', 'H'],
  ['P', 'E', 'L', 'T', 'I', 'C'],
  ['F', 'I', 'S', 'R', 'A', 'Y'],
  ['P', 'S', 'R', 'F', 'Y', 'I'],
  ///
  ['T', 'I', 'T', 'I', 'I', 'E'],
  ['G', 'A', 'M', 'E', 'E', 'U'],
  ['F', 'A', 'A', 'S', 'I', 'R'],
  ['T', 'O', 'N', 'O', 'W', 'U'],
  ['H', 'D', 'R', 'L', 'O', 'N'],
  ///
  ['T', 'E', 'P', 'S', 'I', 'C'],
  ['D', 'O', 'T', 'H', 'D', 'N'],
  ['S', 'U', 'N', 'S', 'E', 'S'],
  ['T', 'I', 'C', 'L', 'I', 'E'],
  ['C', 'E', 'S', 'T', 'N', 'C'],
  ///
  ['T', 'O', 'T', 'O', 'O', 'U'],
  ['S', 'R', 'F', 'A', 'A', 'A'],
  ['D', 'A', 'N', 'N', 'E', 'N'],
  ['N', 'E', 'N', 'M', 'A', 'G'],
  ['E', 'E', 'E', 'E', 'A', 'A'],
  ///
  ['P', 'O', 'A', 'T', 'I', 'C'],
  ['T', 'O', 'A', 'P', 'I', 'C'],
  ['X', 'J', 'K', 'Qu', 'Z', 'B'],
  ['E', 'E', 'E', 'M', 'E', 'A'],
  ['P', 'R', 'Y', 'R', 'I', 'R'],
]

function generateRandomWordFactory() {
  let array = wordFactoryArray
  const randomizedArray = []

  while (array.length > 0) {
    const randomIndex = Math.floor(Math.random() * array.length)
    const randomLetterIndex = Math.floor(Math.random() * 6)
    const randomRotationIndex = Math.floor(Math.random() * 4)
    const possibeRotations = ['0', '90', '180', '270']

    const selectedArray = array[randomIndex]

    randomizedArray.push({
      letter: selectedArray[randomLetterIndex],
      rotation: possibeRotations[randomRotationIndex],
    })

    array = array.filter((_, i) => i !== randomIndex)
  }

  let groupedByFive = []
  const newArray = []

  for (let i = 0; i < randomizedArray.length; i++) {
    groupedByFive.push(randomizedArray[i])

    if (groupedByFive.length > 4) {
      newArray.push(groupedByFive)
      groupedByFive = []
    }
  }

  return newArray
}

module.exports = {
  generateRandomWordFactory,
}
