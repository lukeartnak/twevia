module.exports = function(db) {

  let router = require('express').Router()

  router.get('/', (req, res) => {

    db.questions.find()
      .then(questions => {
        res.json(questions)
      })

  })

  router.get('/:id', (req, res) => {

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

  router.post('/', (req, res) => {

    db.questions.insert({
      title: req.body.title
    }).then(question => {
      db.answers.insert(req.body.answers.map(
        answer => Object.assign({}, answer, {question_id: question.id})
      )).then(fullAnswers => {
        question.answers = fullAnswers.map(answer => ({
          id: answer.id,
          hint: answer.hint
        }))
        res.json(question)
      })
    })

  })

  return router

}
