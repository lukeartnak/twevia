const express = require('express')
const massive = require('massive')

const setup = require('./setup')

let app = express()
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static('public'))

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

  app.get('/api/rooms', (req, res) => {

    db.rooms.find().then(rooms => {
      res.json(rooms)
    })

  })

  app.get('/api/rooms/:name', (req, res) => {

    db.rooms.findOne({
      name: req.params.name
    }).then(room => {
      res.json(room)
    })

  })

  app.post('/api/rooms', (req, res) => {

    db.rooms.insert({
      name: Math.random().toString(36).slice(-5)
    }).then(room => {
      res.json(room)
    })

  })

  return db

}

function setupSocket(db) {

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
      })
    })

    socket.on('disconnect', () => {
      db.players.update({
        socket: socket.id
      }, {
        active: false
      }).then(([player]) => {
        console.log(player)
        io.to(player.room_id).emit('left', {player})
      })
    })

  })

}

function startServer() {

  server.listen(8000, () => {
    console.log('server running at http://localhost:8000')
  })

}
