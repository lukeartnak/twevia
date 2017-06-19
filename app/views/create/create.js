import React from 'react'
import axios from 'axios'

import Button from '../../components/button/button'
import ListGroup from '../../components/list-group/list-group'

import './create.scss'

class CreateView extends React.Component {

  constructor() {
    super()
    this.updateTitle = this.updateTitle.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.updateAnswer = this.updateAnswer.bind(this)
    this.submitQuestion = this.submitQuestion.bind(this)
    this.state = {
      title: '',
      answers: [{id: 0}]
    }
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
        <input type="text" defaultValue={title} onChange={this.updateTitle} />
        <ListGroup
          title="Answers"
          items={this.state.answers}
          getKey={answer => answer.id}
          renderItem={answer => <Answer {...answer} />}
          renderFooter={() => <Button theme="default" onClick={this.addAnswer} block>Add Answer</Button>}
        />
        <Button theme="action" onClick={this.submitQuestion} block>Create Question</Button>
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
      <div className="answer">
        <input type="text" defaultValue={hint} onChange={this.updateHint} />
        <input type="text" defaultValue={primary} onChange={this.updatePrimary} />
        <input type="text" defaultValue={alternate} onChange={this.updateAlternate} />
      </div>
    )
  }

}

export default CreateView
