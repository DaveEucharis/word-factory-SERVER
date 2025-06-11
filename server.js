const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const { generateRandomWordFactory } = require('./utils/wordFactoryArray')
const { scoreTally } = require('./utils/scoreTally')
const { countPlaying } = require('./utils/countPlaying')

const app = express()

const server = http.createServer(app)
const origins = process.env.NODE_ENV
  ? 'https://word-factory-client.vercel.app'
  : '*'
const io = new Server(server, {
  cors: {
    origin: origins,
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 8080

let qeueingPlayersData = []
let tallyResult = []
let startCountdownID = ''

io.on('connection', socket => {
  socket.on('new-player', playerName => {
    if (qeueingPlayersData.some(v => v.id === socket.id)) return

    const newPlayer = {
      name: playerName,
      ready: false,
      id: socket.id,
      playing: false,
    }

    qeueingPlayersData.push(newPlayer)

    io.emit('player-update', qeueingPlayersData)
  })

  socket.on('disconnect', () => {
    qeueingPlayersData = qeueingPlayersData.filter(v => v.id !== socket.id)

    io.emit('player-update', qeueingPlayersData)
  })

  socket.on('ready-update', data => {
    qeueingPlayersData = qeueingPlayersData.map(v =>
      v.id === data.id ? { ...v, ready: data.ready } : v
    )

    io.emit('player-update', qeueingPlayersData)

    //CHECK IF EVERY PLAYER IS READY,,, IF SO STARTGAME
    const condition = () =>
      qeueingPlayersData.every(v => v.ready === true) &&
      qeueingPlayersData.length > 1

    clearTimeout(startCountdownID)

    if (condition())
      startCountdownID = setTimeout(() => {
        if (condition()) {
          qeueingPlayersData = qeueingPlayersData.map(v => ({
            ...v,
            ready: false,
            playing: true,
          }))
          io.emit('start-game')

          tallyResult = []

          const wordFactoryArray = generateRandomWordFactory()

          io.emit('word-factory-array', wordFactoryArray)
        }
      }, 4000)
  })

  socket.on('name-update', data => {
    qeueingPlayersData = qeueingPlayersData.map(v =>
      v.id === data.id ? { ...v, name: data.name } : v
    )

    io.emit('player-update', qeueingPlayersData)
  })

  //TALLYING
  socket.on('found-words', foundWords => {
    if (tallyResult.some(v => v.id === socket.id)) return

    const playerName = qeueingPlayersData.find(v => v.id === socket.id).name

    tallyResult.push({ foundWords, id: socket.id, name: playerName })

    const playingPlayers = countPlaying(qeueingPlayersData)

    if (playingPlayers === tallyResult.length) {
      tallyResult = scoreTally(tallyResult)

      io.emit('tally-result', tallyResult)
    }
  })

  socket.on('return', () => {
    qeueingPlayersData = qeueingPlayersData.map(v =>
      v.id === socket.id ? { ...v, playing: false } : v
    )

    socket.emit('end-game')
  })
})

server.listen(PORT, () => {
  console.log('listening on port: ' + PORT)
})
