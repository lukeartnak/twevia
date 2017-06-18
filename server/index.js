const express = require('express')
const massive = require('massive')
const setup = require('./setup')

let app = express()

app.use(express.static('public'))

connectDatabase()
  .then(setupDatabase)
  .then(setupRoutes)
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

}

function startServer() {

  app.listen(8000, () => {
    console.log('server running at http://localhost:8000')
  })

}
