module.exports = function(db) {

  let router = require('express').Router()

  router.get('/', (req, res) => {

    db.rooms.find().then(rooms => {
      res.json(rooms)
    })

  })

  router.get('/:name', (req, res) => {

    db.rooms.findOne({
      name: req.params.name
    }).then(room => {
      res.json(room)
    })

  })

  router.post('/', (req, res) => {

    db.rooms.insert({
      name: Math.random().toString(36).slice(-5)
    }).then(room => {
      res.json(room)
    })

  })

  return router

}
