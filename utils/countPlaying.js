function countPlaying(data) {
  return data.reduce((acc, v) => (v.playing ? acc + 1 : acc), 0)
}

module.exports = {
  countPlaying,
}
