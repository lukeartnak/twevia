import React from 'react'
import axios from 'axios'

import InputForm from '../../../components/input-form/input-form'
import ListGroup from '../../../components/list-group/list-group'

import './game.scss'

class Game extends React.Component {

  constructor() {
    super()

    this.submitGuess = this.submitGuess.bind(this)
    this.state = {
      answers: []
    }
  }

  submitGuess(guess) {
    this.props.onGuessSubmit(guess)
  }

  render() {
    return (
      <div className="game">
        <InputForm onSubmit={this.submitGuess} />
        <ListGroup
          title="Answers"
          items={this.props.answers}
          renderItem={answer => <Answer {...answer} />}
          getKey={answer => answer.id}
        />
      </div>
    )
  }

}

const Answer = ({hint, primary}) => (
  <div className="answer">
    {hint ? <div className="answer__hint">{hint}</div> : null}
    {primary ? <div className="answer__primary">{primary}</div> : null}
  </div>
)

export default Game
