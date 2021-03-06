const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')
const path = require('path')

const setup = require('./setup')

let app = express()
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

connectDatabase()
  .then(setupDatabase)
  .then(setupRoutes)
  .then(setupSocket)
  .then(startServer)
  .catch(console.log)

function connectDatabase() {

  return massive({
    host: '127.0.0.1',
    port: 5432,
    database: 'twevia',
    user: 'twevia'
  })

}

function setupDatabase(db) {

  return db.run(setup)
    .then(() => db.reload())

}

function setupRoutes(db) {


  let api = express.Router()
  api.use('/rooms', require('./routes/rooms')(db))
  api.use('/questions', require('./routes/questions')(db))
  app.use('/api', api)

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'))
  })

  return db

}

function setupSocket(db) {

  let sendPlayerList = (room) => {
    db.players.find({
      room_id: room,
      active: true
    }).then(players => {
      io.to(room).emit('players', {players})
    })
  }

  io.on('connection', socket => {

    socket.on('join', ({room, name}) => {
      socket.join(room)
      db.players.insert({
        name: name,
        room_id: room,
        socket: socket.id
      }).then(player => {
        socket.emit('player', {player})
        io.to(room).emit('joined', {player})
        sendPlayerList(room)
      })
    })

    socket.on('disconnect', () => {
      db.players.update({
        socket: socket.id
      }, {
        active: false
      }).then(([player]) => {
        if (player) {
          io.to(player.room_id).emit('left', {player})
          sendPlayerList(player.room_id)
        }
      })
    })

  })

}

function startServer() {

  server.listen(8000, () => {
    console.log('server running at http://localhost:8000')
  })

}
