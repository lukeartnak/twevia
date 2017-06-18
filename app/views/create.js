import React from 'react'
import axios from 'axios'

class Create extends React.Component {

  constructor() {
    super()
    this.updateTitle = this.updateTitle.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
    this.state = {title: '', answers: []}
  }

  updateTitle(e) {
    this.setState({title: e.target.value})
  }

  addAnswer() {
    let answer = {id: this.state.answers.length}
    this.setState({
      answers: [...this.state.answers, answer]
    })
  }

  updateAnswer(id, updates) {
    this.setState({
      answers: this.state.answers.map(answer =>
        answer.id === id ? Object.assign({}, answer, updates) : answer
      )
    })
  }

  submitQuestion() {
    let {title, answers} = this.state
    axios.post('/api/questions', {title, answers})
      .then(response => {
        console.log(response.data)
      })
  }

  render() {
    let {title, answers} = this.state
    return (
      <div className="create">
        <h1>Create a Question</h1>
        <input type="text" defaultValue={title} onChange={this.updateTitle} />
        <ul className="questions">
          {answers.map(answer =>
            <Answer key={answer.id} onUpdate={this.updateAnswer} {...answer} />
          )}
          <li>
            <button onClick={this.addAnswer}>Add Answer</button>
          </li>
        </ul>
        <button onClick={this.submitQuestion}>Create Question</button>
      </div>
    )
  }

}

class Answer extends React.Component {

  constructor() {
    super()
    this.updateHint = this.updateHint.bind(this)
    this.updatePrimary = this.updatePrimary.bind(this)
    this.updateAlternate = this.updateAlternate.bind(this)
  }

  updateHint(e) {
    this.props.onUpdate(this.props.id, {hint: e.target.value})
  }

  updatePrimary(e) {
    this.props.onUpdate(this.props.id, {primary: e.target.value})
  }

  updateAlternate(e) {
    this.props.onUpdate(this.props.id, {alternate: e.target.value})
  }

  render() {
    let {id, hint, primary, alternate} = this.props
    return (
      <li className="answer">
        <input type="text" defaultValue={hint} onChange={this.updateHint} />
        <input type="text" defaultValue={primary} onChange={this.updatePrimary} />
        <input type="text" defaultValue={alternate} onChange={this.updateAlternate} />
      </li>
    )
  }

}

export default Create
