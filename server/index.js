const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')

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

  app.get('/api/questions/:id', (req, res) => {

    let id = parseInt(req.params.id)
    let questionQuery = db.questions.findOne(id)
    let answersQuery = db.answers.find({question_id: id})

    Promise.all([questionQuery, answersQuery])
      .then(([question, answers]) => {
        question.answers = answers.map(answer => ({
          id: answer.id,
          hint: answer.hint
        }))
        res.json(question)
      })

  })

  app.post('/api/questions', (req, res) => {

    db.questions.insert({
      title: req.body.title
    }).then(question => {
      db.answers.insert(req.body.answers.map(
        answer => Object.assign(answer, {question_id: question.id})
      )).then(fullAnswers => {
        question.answers = fullAnswers.map(answer => ({
          id: answer.id,
          hint: answer.hint
        }))
        res.json(question)
      })
    })

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
        io.to(player.room_id).emit('left', {player})
        sendPlayerList(player.room_id)
      })
    })

  })

}

function startServer() {

  server.listen(8000, () => {
    console.log('server running at http://localhost:8000')
  })

}
